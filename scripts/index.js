import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {doc, getFirestore, getDoc, setDoc} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import {getAuth, onAuthStateChanged, signOut, updateProfile} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { firebaseConfig } from "./utility.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore();


const logOutBtn = document.querySelector("body > div.header-bar > div.logout-button");
const nameBox = document.querySelector("#name");
const vocabProgressBar = document.querySelector("#pbar0");
const vocabProgress = document.querySelector("#pbarn0");
const sentencesBar = document.querySelector("#pbar1");
const sentencesProgress = document.querySelector("#pbarn1");
const lessonsBar = document.querySelector("#pbar2");
const lessonsProgress = document.querySelector("#pbarn2");
const improvementPointer = document.querySelector("#pointer");
const remarkTxt = document.querySelector("#remark");
const dp = document.querySelector("#dp");
const level = document.querySelector("#level");
const bookClassButton = document.querySelector("#book-class-button");     

let dottFn = document.querySelector(".dots");
var x = 0;
function animate(element, className) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
        setTimeout(() => {
            animate(element, className);
        }, 500);
    }, 500);
}
animate(dottFn, "dots--animate");

function signOutUser(){
    signOut(auth);
    window.location.href = "login.html"
}
logOutBtn.addEventListener("click", signOutUser);

onAuthStateChanged(auth, (user)=>{
    if(user){
        const db = doc(firestore, 'users/'+user.uid);
        getDoc(db)
        .then((data)=>{
            const userData = data.data();
            if(user.displayName == null){
                updateProfile(user, {displayName: userData.name});
                nameBox.textContent = userData.name;
            }
            nameBox.textContent = user.displayName;
            if(user.photoURL == null){
                if (confirm("No profile pic, would you like to upload a profile pic now?")) {
                    window.location.href = 'profile.html';
                }
            }else{
                dp.src = user.photoURL;
            }
            level.textContent = ": "+data.data().level;
            if(userData.vocab == null){
                setDoc(db, {vocab: 0}, {merge: true});
            }else{
                vocabProgress.textContent = userData.vocab + '/150';
                vocabProgressBar.style.width = userData.vocab/150*300 + 'px';
            }
            if(userData.sentences == null){
                setDoc(db, {sentences: 0}, {merge: true});
            }else{
                sentencesProgress.textContent = userData.sentences + '/350';
                sentencesBar.style.width = userData.sentences/350*300 + 'px';
            }
            if(userData.lessons == null){
                setDoc(db, {lessons: 0}, {merge: true});
            }else{
                lessonsProgress.textContent = userData.lessons + '/55';
                lessonsBar.style.width = userData.lessons/55*300 + 'px';
            }
            if(userData.improvement == null){
                setDoc(db, {improvement: 0},{merge: true});
            }else{
                improvementPointer.style.top = 185 - userData.improvement/10*185 + 'px';
                if(userData.improvement < 5){
                    remarkTxt.textContent = "You are doing great!"
                }else{
                    remarkTxt.textContent = "Very Good!"
                }
            }
            document.querySelector("body > div.loading-page").style.display = "none";
        })
        .catch((error)=>{
            window.location.href = "login.html"
        })
    }else{
        const db = doc(firestore, 'users/fdsa');
        getDoc(db).catch((error)=>{
            console.log(error.code)
            if(error.code == 'unavailable'){
                document.querySelector("body > div.loading-page").style.display = "none";
                document.querySelector(".no-int-container").style.display = 'block';
            }else{
                window.location.href = "login.html"
            }
        })
    }
})

bookClassButton.onclick = ()=>{
    window.location.href = "booking.html";
}