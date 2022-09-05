import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {collection, getDocs, doc, getFirestore, getDoc, setDoc} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

import {loadingAnimation} from "../../scripts/utility.js";

loadingAnimation();

const firebaseConfig = {
    apiKey: "AIzaSyCb-TCCOXnPtBU0PpQwU7RJrgjxK9BeMng",
    authDomain: "teacher-mignon.firebaseapp.com",
    projectId: "teacher-mignon",
    storageBucket: "teacher-mignon.appspot.com",
    messagingSenderId: "980519638773",
    appId: "1:980519638773:web:5a89b64e00157f851457bc",
    measurementId: "G-N4BBN6VPBF"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore();

const detailsPopup = document.querySelector("#details-popup");
const profilePicU = document.querySelector("#profile-pic")
const mask = document.querySelector("#mask");
const namePlaceholder = document.querySelector("#name-placeholder");
const levelSelection = document.querySelector("#level-selection");
const levelPlaceHolder = document.querySelector("#level-place-holder");
const location = document.querySelector("#location");
const emailPlaceholder = document.querySelector("#mail");
const phonePlaceholder = document.querySelector("#phone");


var currentStudent;
var collectionArray;

const db = collection(firestore, "users");
getDocs(db)
.then((result)=>{
    collectionArray = result.docs;
    setTable(result.docs);
    setProfilePic();
    
}).catch((error)=>{
    console.log(error.code);
})




const storage = getStorage();
const studentsTable = document.querySelector("#students-table");


function studentClick(element){
    currentStudent = element.id;
    detailsPopup.style.display = "flex";
    mask.style.display = "block";
    profilePicU.src = element.firstChild.firstChild.src;
    namePlaceholder.innerHTML = element.firstChild.nextSibling.innerHTML;
    const levelP = element.firstChild.nextSibling.nextSibling.firstChild;
    levelSelection.value = levelP[levelP.selectedIndex].value;
    collectionArray.forEach(e => {
        if(e.id == currentStudent){
            location.innerHTML = "<a style='text-decoration: none; color: black' target='_blank' href='https://www.google.com/maps/place/"+e.data().country+"/'>"+e.data().country+"</a>";
            console.log(location.nextElementSibling);
            emailPlaceholder.innerHTML = "<a style='text-decoration: none; color: rgb(88, 88, 255);' target='_blank' href='mailto:"+e.data().email+"'>"+e.data().email+"</a>";
            phonePlaceholder.innerHTML = "<a style='text-decoration: none; color: rgb(88, 88, 255);' target='_blank' href='tel:"+e.data().phone+"'>"+e.data().phone+"</a>";
        }
    });
}




var count = 0;
function setProfilePic(){
    const tableRows = document.querySelectorAll("tr");
    tableRows.forEach(element => {
        element.firstChild.nextSibling.style.textAlign = "left";
        if(element.id != ""){
            element.firstChild.nextSibling.onmouseover = ()=>{
                element.style.cursor = "pointer";
            }
            element.firstChild.nextSibling.onclick = ()=>{
                studentClick(element);
            }
            element.firstChild.onmouseover = ()=>{
                element.style.cursor = "pointer";
            }
            element.firstChild.onclick = ()=>{
                studentClick(element);
            }
            element.onclick = ()=>{
                currentStudent = element.id;
            }
            getDownloadURL(ref(storage, element.id+".png"))
            .then((url)=>{
                count++;
                element.firstChild.style.width = '0px';
                element.firstChild.style.backgroundColor = "white";
                element.firstChild.innerHTML = "<img src="+url+" height='50' width='50' style='object-fit: cover; border-radius:25px; background-color:white; margin:auto; box-shadow: 0px 0px 8px rgb(0,0,0,16%)'>";
                if(count >= tableRows.length){
                    setTimeout(() => {
                        document.querySelector(".loading-page").style.display = "none";
                    }, 1000);
                }
            }).catch(()=>{
                count++;
                element.firstChild.style.width = '0px';
                element.firstChild.style.backgroundColor = "white";
                if(count >= tableRows.length){
                    setTimeout(() => {
                        document.querySelector(".loading-page").style.display = "none";
                    }, 1000);
                }
            })
        }else{
            count++;
        }
    });
}

mask.onclick = ()=>{
    detailsPopup.style.display = 'none';
    mask.style.display = 'none';
}

function setTable(arr){
    for(var i = 0; i < arr.length; i++){
        if(arr[i].id != 'SX3Jy7w14xbMj3WJHRk8Ab7Lxtm2' && arr[i].id != 'E216K5XizSc8asGmrVukIDIqH8v1'){
            var row = studentsTable.insertRow(studentsTable.rows.length)
            row.id = arr[i].id;
            var name = arr[i].data().name;
            var phone = arr[i].data().phone;
            row.insertCell(0).innerHTML = "<img src='../images/default.png' height='50' width='50' style='object-fit: cover; border-radius:25px; background-color:white; margin: auto; box-shadow: 0px 0px 8px rgb(0,0,0,16%)'>";
            row.insertCell(1).innerHTML = "<span style='font-weight:1000; margin-left:5px'>"+name+"</span>";
            var levelI = row.insertCell(2);
            levelI.innerHTML  = '<select name="Level"><option value="Beginner">Beginer</option><option value="Intermediate">Intermediate</option><option value="Advance">Advance</option></select>';
            levelI.firstChild.value = arr[i].data().level;
            levelI.onchange = (e)=>{
                const db = doc(firestore, "users/"+currentStudent);
                setDoc(db, {level: e.target.value}, {merge: true});
            }
            row.insertCell(3).innerHTML = "<span style='color:blue;'><a style='text-decoration: none' href='tel:"+phone+"'>"+phone+"<a/></span>";
            row.insertCell(4).innerHTML = "No lesson yet";
            row.insertCell(5).innerHTML = "No lesson yet";
            row.insertCell(6).innerHTML = "0";
        }
    }
}

levelSelection.onchange = ()=>{
    const db = doc(firestore, "users/"+currentStudent);
    document.querySelector(getID(currentStudent)).firstChild.nextSibling.nextSibling.firstChild.value = levelSelection.value;
    setDoc(db, {level: levelSelection.value}, {merge: true});
    // getDoc(db).then((result)=>{
        
    // })
}

function getID(id){
    if(Number(id[0])){
        return "#\\3"+id[0]+" "+id.substring(1,id.length);
    }else{
        return "#"+id;
    }
}