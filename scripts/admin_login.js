import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {getAuth, signInWithEmailAndPassword, AuthErrorCodes} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {doc, getFirestore, getDoc} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { firebaseConfig } from "./utility.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore();

const loginBtn = document.querySelector("#loginBtn");
const emailField = document.querySelector("#emailField");
const passwordField = document.querySelector("#passwordField");
const errorMsg = document.querySelector("#errorMsg");

loginBtn.onclick = ()=>{
    if(checkForErrors()){
        signInWithEmailAndPassword(auth, emailField.value, passwordField.value)
        .then((result)=>{
            const db = doc(firestore, 'admin/'+result.user.uid);
            getDoc(db).then((data)=>{
                window.location.href = "admin.html"
            }).catch((error)=>{
                if(error.code == 'permission-denied'){
                    errorMsg.textContent = "You're not an admin please do not try again!";
                    errorMsg.style.visibility = "visible";
                }
            })
        }).catch((error)=>{
            console.log(error.code);
        })
    }
}

function checkForErrors(){
    if(emailField.value != "" && passwordField.value != ""){
        return true;
    }else{
        if(emailField.value == ""){
            emailField.style.border = "1px solid red";
        }
        if(passwordField.value == ""){
            passwordField.style.border = "1px solid red";
        }
        errorMsg.textContent = "Please fill all mandatory fields!";
        errorMsg.style.visibility = "visible";
    }
}

emailField.onclick = ()=>{
    emailField.style.border = "1px solid black"
    errorMsg.style.visibility = "hidden";
}
passwordField.onclick = ()=>{
    passwordField.style.border = "1px solid black"
    errorMsg.style.visibility = "hidden";
}