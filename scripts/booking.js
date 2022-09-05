import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {doc, getFirestore, getDoc, setDoc} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { firebaseConfig, loadingAnimation } from "./utility.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore();

loadingAnimation();

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const db = doc(firestore, "classes/openslots");
const slots = document.querySelectorAll(".slots");
const chosenSlotsBox = document.querySelector("#chosen-slots-box");
const noOfClasses = document.querySelector("#numbers");
const amount = document.querySelector("#amount");
const loadinPage = document.querySelector(".loading-page");
const payBtn = document.querySelector("#pay-button");

var openSlots = [];
var bookedSlots = [];

getDoc(db).then((result)=>{
    openSlots = [];
    const dbSlots = result.data().class;
    dbSlots.forEach(element => {
        openSlots.push(new Date(element.seconds*1000));
    });
    setSlots();
    loadinPage.style.display = "none";
}).catch((error)=>{
    loadinPage.style.display = "none";
    console.log(error.code);
})
var slotHead = document.querySelectorAll(".slotHead");
var d = new Date();

setHeader(0);

function setHeader(offset){
    if(offset < 28){
        d = new Date();
        d.setDate(d.getDate()+offset);
        slotHead.forEach((element) => {
            element.innerHTML = getDay(d.getDay()) + "<br>" + d.getDate() +"-" +month[d.getMonth()].substring(0, 3);
            d.setDate(d.getDate()+1);
        });
    }
}

function getDay(dayNum){
    const days = ['Sunday ', 'Monday ', 'Tuesday ', 'Wednesday ', 'Thursday ', 'Friday ', 'Saturday ']
    return days[dayNum%7];
}

function setSlots(){
    slots.forEach(element => {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    });
    var sortedSlots = sortSlots(openSlots);
    var temp;
    slotHead.forEach((element, index) => {
        sortedSlots.forEach(slotTime => {
            temp = element.textContent;
            if(slotTime.getDate() == temp.substring(temp.length-6, temp.length-4) && month[slotTime.getMonth()].substring(0, 3) == temp.substring(temp.length-3)){
                const slotDiv = document.createElement("div");
                slotDiv.className = "slot-div";
                slotDiv.innerHTML = "<span style='margin: auto'>"+String(slotTime.getHours()).padStart(2, '0') + ":" + String(slotTime.getMinutes()).padStart(2, '0')+" - "+String(slotTime.getHours()).padStart(2, '0')+":"+String(Number(slotTime.getMinutes()+25)).padStart(2, '0')+"</span>";
                slots[index].appendChild(slotDiv);
                slotDiv.onclick = ()=>{
                    removeFromArray(openSlots, slotTime);
                    bookedSlots.push(slotTime);
                    setBookedSlots(sortSlots(bookedSlots));
                    setSlots();
                    noOfClasses.textContent = bookedSlots.length;
                    amount.innerHTML = "<b>₱ " + (bookedSlots.length)*120+".00</b>";
                }
            }
        }); 
    });
}


function setBookedSlots(arr){
    while (chosenSlotsBox.firstChild) {
        chosenSlotsBox.removeChild(chosenSlotsBox.firstChild);
    }
    var sDate;
    arr.forEach(slotTime => {
        const slotDay = document.createElement("div");
        slotDay.className = "slot-day";
        sDate = getDay(slotTime.getDay()).substring(0, 3) + ", " + slotTime.getDate() + " " +month[slotTime.getMonth()].substring(0, 3);
        slotDay.innerHTML = "<span style='width: 500px'><b>" +sDate + "</b></span>";
        const slotDiv = document.createElement("div");
        slotDiv.className = "slot-div";
        slotDiv.innerHTML = "<span style='margin: auto'>"+String(slotTime.getHours()).padStart(2, '0') + ":" + String(slotTime.getMinutes()).padStart(2, '0')+" - "+String(slotTime.getHours()).padStart(2, '0')+":"+String(Number(slotTime.getMinutes()+25)).padStart(2, '0')+"</span>";
        if(!slotDayExists(sDate)){
            chosenSlotsBox.appendChild(slotDay);
            slotDay.appendChild(slotDiv);
        }else{
            slotDayExists(sDate).appendChild(slotDiv);
        }
        slotDiv.onclick = ()=>{
            window.scrollTo(slotDiv)
            removeFromArray(bookedSlots, slotTime);
            openSlots.push(slotTime);
            setBookedSlots(sortSlots(bookedSlots));
            setSlots();
            noOfClasses.textContent = bookedSlots.length;
            amount.innerHTML = "<b>₱ " + (bookedSlots.length)*120+".00</b>";
        }
    });
}

function slotDayExists(str){
    const slotDays = document.querySelectorAll(".slot-day");
    var result = null;
    slotDays.forEach(element => {
        if(element.textContent.indexOf(str) > -1){
            result = element;
        }
    });

    return result;
}

function sortSlots(arr){
    var compOne;
    var timeSlotArrayObj = [];
    var sortedTime = [];
    for(var i = 0; i < arr.length; i++){
        if(arr[i] != null){
            compOne = arr[i].getTime();
            timeSlotArrayObj.push([arr[i],compOne])
        }
    }
    //Perform Sorting.
        timeSlotArrayObj.sort((a,b)=>{
            return a[1] - b[1]
        });
        timeSlotArrayObj.forEach(slots=>{
            if(slots[0].getTime() > new Date().getTime()){
                sortedTime.push(slots[0])
            }
        });
        return sortedTime;
}



function removeFromArray(arr, string){
    arr.forEach((element, index) => {
        if(element == string){
            return arr.splice(index, 1);
        }
    });
}

var countDate = 0;
document.querySelector("#left-button").onclick = ()=>{
    if(countDate >= 7){
        countDate-=7;
        setHeader(countDate);
        setSlots();
    }
}
document.querySelector("#right-button").onclick = ()=>{
    if(countDate < 7){
        countDate+=7;
        setHeader(countDate);
        setSlots();
    }
}

payBtn.onclick = ()=>{
    console.log(bookedSlots);
    var url = "http://elselse.c1.biz/php/test.php?uid="+auth.currentUser.uid + "&slots="+ bookedSlots.toString()+"";
    // setTimeout(() => {
    //     tab.close();
    // }, 1000);
}