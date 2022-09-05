import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {getDoc, setDoc, deleteDoc, doc, getFirestore} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
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
const auth = getAuth();
const firestore = getFirestore();


const profilePic = document.querySelector("#profile-pic");
const displayName = document.querySelector("#display-name");


onAuthStateChanged(auth, (user)=>{
    if(user){
        profilePic.src = user.photoURL;
        displayName.textContent = user.displayName;
        setTimeout(() => {
            document.querySelector(".loading-page").style.display = "none";
        }, 3000);
    }
})