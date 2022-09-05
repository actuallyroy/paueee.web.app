document.querySelector("#home-button").onclick = function(){
    document.querySelector("#main-content").src = "adminpages/home.html";
    highLight(this);
}
document.querySelector("#slots-button").onclick = function(){
    document.querySelector("#main-content").src = "adminpages/slots.html";
    highLight(this);
}
document.querySelector("#fee-summary").onclick = function(){
    document.querySelector("#main-content").src = "adminpages/feesummary.html";
    highLight(this);
}
document.querySelector("#lessons-button").onclick = function(){
    document.querySelector("#main-content").src = "adminpages/lessons.html";
    highLight(this);
}
document.querySelector("#students-button").onclick = function(){
    document.querySelector("#main-content").src = "adminpages/students.html";
    highLight(this);
}
document.querySelector("#feedback-button").onclick = function(){
    document.querySelector("#main-content").src = "adminpages/feedback.html";
    highLight(this);
}
document.querySelector("#materials-button").onclick = function(){
    document.querySelector("#main-content").src = "adminpages/materials.html";
    highLight(this);
}
document.querySelector("#teaching-tools-button").onclick = function(){
    document.querySelector("#main-content").src = "adminpages/teachingtools.html";
    highLight(this);
}
document.querySelector("#help-button").onclick = function(){
    document.querySelector("#main-content").src = "adminpages/help.html";
    highLight(this);
}

const hideMenuBtn = document.querySelector("#hide-menu-button");
const elems = document.querySelectorAll(".menu-buttons");
const leftMenu = document.querySelector(".left-menu");

hideMenuBtn.onclick = ()=>{
    var leftMenuC = ["Home", "Slots",  "Fee summary", "Lessons", "Students", "Feedback", "Materials", "Teaching tools", "Help"];
    if(leftMenu.style.width != "70px"){
        leftMenu.style.width = "70px"
        hideMenuBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" opacity="0.2"></circle><circle cx="128" cy="128" r="96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><polyline points="88 160 120 128 88 96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><polyline points="144 160 176 128 144 96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg>';
        elems.forEach(element => {
            var key = element.textContent;
            switch (key) {
                case "Home":
                    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M218.8,103.7,138.8,31a16,16,0,0,0-21.6,0l-80,72.7A16,16,0,0,0,32,115.5v92.1a16.4,16.4,0,0,0,4,11A15.9,15.9,0,0,0,48,224H96a8,8,0,0,0,8-8V168a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8v48a8,8,0,0,0,8,8h48a15.6,15.6,0,0,0,7.6-1.9A16.1,16.1,0,0,0,224,208V115.5A16,16,0,0,0,218.8,103.7Z"></path></svg>';
                    break;
                case "Slots":
                    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM156,160H136v20a8,8,0,0,1-16,0V160H100a8,8,0,0,1,0-16h20V124a8,8,0,0,1,16,0v20h20a8,8,0,0,1,0,16Zm52-80H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z"></path></svg>';
                    break;
                case "Fee summary":
                    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M148,152a60,60,0,0,0,0-120H88a8,8,0,0,0-8,8v96H56a8,8,0,0,0,0,16H80v16H56a8,8,0,0,0,0,16H80v32a8,8,0,0,0,16,0V184h48a8,8,0,0,0,0-16H96V152ZM96,48h52a44,44,0,0,1,0,88H96Z"></path></svg>';
                    break;
                case "Lessons":
                    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="#faf9f9" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M240,192h-8V56a16,16,0,0,0-16-16H40A16,16,0,0,0,24,56V192H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16Zm-24,0H144V176a8,8,0,0,1,8-8h56a8,8,0,0,1,8,8Zm0-48a8,8,0,0,1-16,0V72H56V184a8,8,0,0,1-16,0V64a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8Z"></path></svg>';
                    break;
                case "Students":
                    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="#faf9f9" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M226.5,56.4l-96-32a8.5,8.5,0,0,0-5,0l-95.9,32h-.2l-1,.5h-.1l-1,.6c0,.1-.1.1-.2.2l-.8.7h0l-.7.8c0,.1-.1.1-.1.2l-.6.9c0,.1,0,.1-.1.2l-.4.9h0l-.3,1.1v.3A3.7,3.7,0,0,0,24,64v80a8,8,0,0,0,16,0V75.1L73.6,86.3A63.2,63.2,0,0,0,64,120a64,64,0,0,0,30,54.2,96.1,96.1,0,0,0-46.5,37.4,8.1,8.1,0,0,0,2.4,11.1,7.9,7.9,0,0,0,11-2.3,80,80,0,0,1,134.2,0,8,8,0,0,0,6.7,3.6,7.5,7.5,0,0,0,4.3-1.3,8.1,8.1,0,0,0,2.4-11.1A96.1,96.1,0,0,0,162,174.2,64,64,0,0,0,192,120a63.2,63.2,0,0,0-9.6-33.7l44.1-14.7a8,8,0,0,0,0-15.2ZM128,168a48,48,0,0,1-48-48,48.6,48.6,0,0,1,9.3-28.5l36.2,12.1a8,8,0,0,0,5,0l36.2-12.1A48.6,48.6,0,0,1,176,120,48,48,0,0,1,128,168Z"></path></svg>';
                    break;
                case "Feedback":
                    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="#faf9f9" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M208.9,144a15.8,15.8,0,0,1-10.5,15l-52.2,19.2L127,230.4a16,16,0,0,1-30,0L77.8,178.2,25.6,159a16,16,0,0,1,0-30l52.2-19.2L97,57.6a16,16,0,0,1,30,0l19.2,52.2L198.4,129A15.8,15.8,0,0,1,208.9,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z"></path></svg>';
                    break;
                case "Materials":
                    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"  fill="#faf9f9" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M233.6,195.6,192.2,41a16,16,0,0,0-19.6-11.3L141.7,38l-1,.3A16,16,0,0,0,128,32H96a15.8,15.8,0,0,0-8,2.2A15.8,15.8,0,0,0,80,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H80a15.8,15.8,0,0,0,8-2.2,15.8,15.8,0,0,0,8,2.2h32a16,16,0,0,0,16-16V108.4l27.8,103.7A16,16,0,0,0,187.3,224a19.9,19.9,0,0,0,4.1-.5l30.9-8.3A16,16,0,0,0,233.6,195.6ZM176.7,45.2,183,68.3l-30.9,8.3-6.3-23.1ZM128,48V168H96V48ZM80,48V72H48V48Zm48,160H96V184h32v24Zm90.2-8.3L187.3,208,181,184.8l31-8.3,6.2,23.2Z"></path></svg>';
                    break;
                case "Teaching tools":
                    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="#faf9f9" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M228.7,88A15.9,15.9,0,0,0,224,76.7L179.3,32a16.1,16.1,0,0,0-22.6,0L36.7,152a16,16,0,0,0-3.6,5.4l-.3.8a17,17,0,0,0-.8,5.1V208a16,16,0,0,0,16,16H92.7a14.4,14.4,0,0,0,5.1-.9l.8-.2a16,16,0,0,0,5.4-3.6l83.7-83.7,3.4,13.9-36.8,36.8a8.1,8.1,0,0,0,0,11.4,8.2,8.2,0,0,0,11.4,0l40-40a8.5,8.5,0,0,0,2.1-7.6l-6.9-27.6L224,99.3A15.9,15.9,0,0,0,228.7,88ZM192,108.7,147.3,64,168,43.3,212.7,88Z"></path></svg>';
                    break;
                case "Help":
                    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="#faf9f9" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm0,168a12,12,0,1,1,12-12A12,12,0,0,1,128,192Zm8-48.9v.9a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8,20,20,0,1,0-20-20,8,8,0,0,1-16,0,36,36,0,1,1,44,35.1Z"></path></svg>';
                default:
                    break;
            }
            element.style.marginRight = '10px'
        });
    }else{
        leftMenu.style.width = "200px";
        hideMenuBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" opacity="0.2"></circle><circle cx="128" cy="128" r="96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><polyline points="168 160 136 128 168 96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><polyline points="112 160 80 128 112 96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg>';
        elems.forEach((element, index) => {
            element.innerHTML = leftMenuC[index];
        });
    }
}


function highLight(elem){
    elems.forEach(element => {
        if(element != elem){
            element.style.backgroundColor = "#707070";
        }else{
            elem.style.backgroundColor = "black";
        }
    });
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {doc, getFirestore, getDoc} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { firebaseConfig } from "./utility.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore();

onAuthStateChanged(auth, (user)=>{
    if(user){

    }else{
        window.location.href = "AdminLogin.html";
    }
    const db = doc(firestore, 'admin/'+auth.currentUser.uid);
    getDoc(db).then((data)=>{
        console.log(data.data());
    }).catch((error)=>{
        if(error.code == 'permission-denied'){
            window.location.href = "index.html";
        }
    })
})

