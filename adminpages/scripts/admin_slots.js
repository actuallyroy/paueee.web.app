import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {getDoc, getDocs, setDoc, deleteDoc, doc, getFirestore, collection} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { firebaseConfig } from "../../scripts/utility.js";

import {loadingAnimation} from "../../scripts/utility.js";

loadingAnimation();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore();

const db = doc(firestore, "classes/openslots")
const co = collection(firestore, "users");
var openSlots = [];
var dbBookedSlots = [];
var bookedSlots = [];
const slotsTable = document.querySelector("#slots");
const nextBtn = document.querySelector("#next-button");
const prevBtn = document.querySelector("#previous-button");
const bkdClassClr = "rgb(167, 127, 214)";

const slotsTableHolder = document.querySelector(".slots-table-holder");
const loadingPage = document.querySelector(".loading-page");

var x = 0;


getDocs(co).then((result)=>{
    var studentsData = result.docs;
    var col1;
    studentsData.forEach(element => {
        var studentUID = element.id;
        col1 = collection(firestore, "users/"+element.id+"/classes");
        getDocs(col1).then((result1)=>{
            if(result1.docs[0]){
                dbBookedSlots.push(studentUID, result1.docs);
                result1.docs.forEach(elem => {
                    console.log(elem.data().done);
                    if(!elem.data().done){
                        bookedSlots.push([studentUID, elem.id, element.data().name]);
                    }
                });
            }
            x++;
            if(x == studentsData.length){
                console.log(x);
                setBookedSlotsColor(bookedSlots);
            }
        })
    });


})

getDoc(db).then((result)=>{
    loadingPage.style.display = "none";
    openSlots = [];
    const dbSlots = result.data().class;
    dbSlots.forEach(element => {
        openSlots.push(new Date(element.seconds*1000));
    });
    setSlotsTable();
    setClickListner();
    slotsTableHolder.scroll(0, 1500)
}).catch(()=>{
    setSlotsTable();
    setClickListner();
    slotsTableHolder.scroll(0, 1500)
})


const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var d = new Date();

var slotHead = document.querySelectorAll("th");
const saveBtn = document.querySelector("#saveBtn");

setHeader(0);

function setHeader(offset){
    if(offset < 28){
        d = new Date();
        d.setDate(d.getDate()+offset);
        slotHead.forEach((element, index) => {
            element.innerHTML = getDay(d.getDay()) + "<br>" + d.getDate() +"-" +month[d.getMonth()].substring(0, 3);
            d.setDate(d.getDate()+1);
        });
    }
}



function setSlotsTable(){
    var d1 = new Date();
    for(var j = 0; j < 24; j++){
        var row = slotsTable.insertRow(slotsTable.rows.length);
        for(var i = 0; i < 7; i++){
            var rowElem = row.insertCell(i);
            rowElem.className = "column"+i;
            rowElem.style.fontWeight = "600"
            if(j > 5){
                rowElem.style.border = "2px solid green"
            }
            var tempHead = slotHead[i].textContent;
            if(tempHead.substring(tempHead.length-6,  tempHead.length-4).trim() == d1.getDate()){
                if(j <= d1.getHours()){
                    rowElem.style.backgroundColor = "gray";
                }
            }
            rowElem.innerHTML = j.toString().padStart(2,0)+":00 - "+j.toString().padStart(2,0)+":25";
        }
        var row = slotsTable.insertRow(slotsTable.rows.length);
        for(var i = 0; i < 7; i++){
            var rowElem = row.insertCell(i);
            rowElem.className = "column"+i;
            rowElem.style.fontWeight = "600"
            if(j > 5){
                rowElem.style.border = "2px solid green"
            }
            var tempHead = slotHead[i].textContent;
            if(tempHead.substring(tempHead.length-6,  tempHead.length-4).trim() == d1.getDate()){
                if(d1.getMinutes() > 30){
                    if(j <= d1.getHours()){
                        rowElem.style.backgroundColor = "gray";
                    }
                }else{
                    if(j < d1.getHours()){
                        rowElem.style.backgroundColor = "gray";
                    }
                }
            }
            rowElem.innerHTML = j.toString().padStart(2,0)+":30 - "+j.toString().padStart(2,0)+":55";
        }
    }
}

function setSlotsColor(){
    var d1 = new Date();
    var lDate,lMonth, lHr, lMin, temp;
    var lD = new Date();
    const slots = document.querySelectorAll("td");
    slots.forEach(element => {
        var indx = Number(element.className.substring(6,element.className.length));
        var tempHead = slotHead[indx].textContent;
        var hrs = element.textContent.substring(0, 2);
        var mins = element.textContent.substring(3,5);
        element.innerHTML = element.textContent.substring(0, 13);
        if(tempHead.substring(tempHead.length-6,  tempHead.length-4).trim() == d1.getDate()){
            if(hrs <= d1.getHours() && mins < d1.getMinutes()){
                element.style.backgroundColor = "gray";
            }else if(hrs < d1.getHours()){
                element.style.backgroundColor = "gray";
            }
        }
        openSlots.forEach((elem) => {
            temp = slotHead[indx].textContent;
            lDate = temp.substring(temp.length-6, temp.length-4);
            lMonth = temp.substring(temp.length-3);
            lHr = element.textContent.substring(0, 2);
            lMin = element.textContent.substring(3, 5);
            const unixTimeZero = Date.parse(lDate + " " + lMonth + " " + lD.getFullYear() + " " + lHr+":"+lMin+":"+'00 GMT+0800');
            lD = new Date(unixTimeZero);
            if(elem.toString() == lD.toString()){
                if(element.style.backgroundColor != 'gray'){
                    element.style.backgroundColor = "rgb(153, 255, 153)";
                    element.innerHTML = element.innerHTML+"<br>Open"
                }else{
                    element.style.backgroundColor = "darkgray";
                }
            }
        });
    });
}

function setClickListner(){
    var lDate,lMonth, lHr, lMin, temp;
    var lD = new Date();
    const slots = document.querySelectorAll("td");
    slots.forEach(element => {
        var indx = Number(element.className.substring(6,element.className.length));
        if(slotHead[indx].textContent.indexOf("Sunday")>-1 || slotHead[indx].textContent.indexOf("Saturday")>-1){
            element.style.color = "#505050"
            element.style.border = "none"
        }
        openSlots.forEach((elem) => {
            temp = slotHead[indx].textContent;
            lDate = temp.substring(temp.length-6, temp.length-4);
            lMonth = temp.substring(temp.length-3);
            lHr = element.textContent.substring(0, 2);
            lMin = element.textContent.substring(3, 5);
            const unixTimeZero = Date.parse(lDate + " " + lMonth + " " + lD.getFullYear() + " " + lHr+":"+lMin+":"+'00 GMT+0800');
            lD = new Date(unixTimeZero);
            if(elem.toString() == lD.toString()){
                if(element.style.backgroundColor != 'gray'){
                    element.style.backgroundColor = "rgb(153, 255, 153)";
                    element.innerHTML = element.innerHTML+"<br>Open"
                }else{
                    element.style.backgroundColor = "darkgray";
                }
            }
        });

        element.onclick = ()=>{
            if(element.style.backgroundColor != "gray" && element.style.backgroundColor != "darkgray" && element.style.backgroundColor != bkdClassClr){
                var ind = Number(element.className.substring(6,7));
                temp = slotHead[ind].textContent;
                lDate = temp.substring(temp.length-6, temp.length-4);
                lMonth = temp.substring(temp.length-3);
                lHr = element.textContent.substring(0, 2);
                lMin = element.textContent.substring(3, 5);
                const unixTimeZero = Date.parse(lDate + " " + lMonth + " " + lD.getFullYear() + " " + lHr+":"+lMin+":"+'00 GMT+8');
                lD = new Date(unixTimeZero);

                if(element.style.backgroundColor != 'rgb(153, 255, 153)'){
                    element.style.backgroundColor = "rgb(153, 255, 153)";
                    element.innerHTML = element.innerHTML+"<br>Open"
                    openSlots.push(lD)
                }else{
                    element.innerHTML = element.textContent.substring(0, 13)
                    element.style.backgroundColor = "rgb(255, 255, 184)";
                    removeFromArray(openSlots, lD)
                }
                saved = false;
            }
        }
    })
}

var saved = true;

saveBtn.onclick = ()=>{
    var sortedSlots = sortSlots(openSlots)
    if(!saved){
        deleteDoc(db).then(()=>{
            setDoc(db, {class: sortedSlots}).then(()=>{
                alert("Saved successfully!");
                saved = true;
            })
        })
    }
}

function getDay(dayNum){
    const days = ['Sunday ', 'Monday ', 'Tuesday ', 'Wednesday ', 'Thursday ', 'Friday ', 'Saturday ']
    return days[dayNum%7];
}

function removeFromArray(arr, string){
    arr.forEach((element, index) => {
        if(element == string.toString()){
            return arr.splice(index, 1);
        }
    });
}
var offsetSet = 0;
nextBtn.onclick = ()=>{
    const slots = document.querySelectorAll("td");
    if(offsetSet <= 14){
        offsetSet+=7;
    }
    setHeader(offsetSet);
    slots.forEach(element => {
        element.style.backgroundColor = "rgb(255, 255, 184)";
    });
    setSlotsColor();
    if(offsetSet>= 21){
        nextBtn.style.fill = "darkgray";
    }else{
        nextBtn.style.fill = "#444444";
    }
    if(offsetSet < 7){
        prevBtn.style.fill = "darkgray";
    }else{
        prevBtn.style.fill = "#444444";
    }
    setBookedSlotsColor(bookedSlots);
}

prevBtn.onclick = ()=>{
    const slots = document.querySelectorAll("td");
    if(offsetSet >= 7){
        offsetSet-=7;
    }
    setHeader(offsetSet);
    slots.forEach(element => {
        element.style.backgroundColor = "rgb(255, 255, 184)";
    });
    setSlotsColor();
    if(offsetSet>21){
        nextBtn.style.fill = "darkgray";
    }else{
        nextBtn.style.fill = "#444444";
    }
    if(offsetSet < 7){
        prevBtn.style.fill = "darkgray";
    }else{
        prevBtn.style.fill = "#444444";
    }
    setBookedSlotsColor(bookedSlots);
}

function sortSlots(arr){
    var compOne;
    var d = new Date();
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

function setBookedSlotsColor(arr){
    const slots = document.querySelectorAll("td");
    var d = new Date();
    var lDate, lMonth, lHr, lMin, lD = new Date();
    arr.forEach(element => {
        d = new Date(element[1])
        slots.forEach(elem => {
            var indx = Number(elem.className.substring(6));
            var temp = slotHead[indx].textContent;
            lDate = temp.substring(temp.length-6, temp.length-4);
            lMonth = temp.substring(temp.length-3);
            lHr = elem.textContent.substring(0, 2);
            lMin = elem.textContent.substring(3, 5);
            const unixTimeZero = Date.parse(lDate + " " + lMonth + " " + lD.getFullYear() + " " + lHr+":"+lMin+":"+'00 GMT+8');
            lD = new Date(unixTimeZero);
            if(lD.toString() == d.toString()){
                console.log(elem);
                console.log(element[2]);
                elem.innerHTML = elem.textContent.substring(0, 13) +"<br><span style='color: blue'>"+ element[2]+"</span>";
                elem.style.backgroundColor = bkdClassClr;
            }
            // console.log(lDate);
            // console.log(new Date(element[1]).getDate());
           
       });
    });
}