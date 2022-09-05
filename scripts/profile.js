import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {doc, getFirestore, getDoc, setDoc} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import {
    getAuth,
    updateEmail,
    onAuthStateChanged,
    signOut,
    updateProfile,
    RecaptchaVerifier,
    sendEmailVerification,
    signInWithPhoneNumber,
    PhoneAuthProvider,
    linkWithCredential,
    AuthErrorCodes,
    unlink
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
import { firebaseConfig } from "./utility.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore();

var uid;
var userData;

var changedPhone = false;
var changedName = false;
var changedEmail = false;
var changedLocation = false;

const profilePic = document.querySelector("#profile-pic");
const firstNameField = document.querySelector("#first-name");
const lastNameField = document.querySelector("#last-name");
const emailField = document.querySelector("#email");
const phoneField = document.querySelector("#phone");
const logOutBtn = document.querySelector("body > div.header-bar > div.logout-button");
const locationField = document.querySelector("#location");
const loadingPage = document.querySelector("body > div.loading-page");
const saveBtn = document.querySelector("#save-button");
const verifyEmailBtn = document.querySelector("#verify-email-button")
const verifyPhoneBtn = document.querySelector("#verify-phone-button");
const phoneVerificationPopup = document.querySelector("body > div.verify-phone-popup");
const errorMsgForPhoneVerification = document.querySelector("#errorMsg");
const phoneFieldForPhoneVerification = document.querySelector("#phone-for-verification");
const sendOtpBtn = document.querySelector("#send-otp-button");
const otpField = document.querySelector("#otp-for-verification");
const submitOtpBtn = document.querySelector("#submit-otp-button");
const changePassButton = document.querySelector("#change-pass-button");


let dottFn = document.querySelector(".dots");
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
onAuthStateChanged(auth, (user)=>{
    if(user){
        uid = user.uid;
        if(user.emailVerified){
            verifyEmailBtn.style.display = "none";
        }else{
            verifyEmailBtn.style.display = "block";
        }
        const nameArr = user.displayName.split(" ");
        const name = user.displayName;
        const lastName = nameArr[nameArr.length-1];
        if(nameArr.length == 1){
            firstNameField.value = nameArr[0];
            lastNameField.value = "";
        }else{
            firstNameField.value = name.substring(0, name.length -lastName.length-1);
            lastNameField.value = nameArr[nameArr.length-1];
        }
        emailField.value = user.email;
        if(user.phoneNumber!= null){
            phoneField.value = user.phoneNumber;
            verifyPhoneBtn.style.display = "none";
        }else{
            verifyPhoneBtn.style.display = "block";
        }
        if(user.photoURL != null){
            profilePic.src = user.photoURL;
        }
        const db = doc(firestore, 'users/'+user.uid);
        getDoc(db)
        .then((data)=>{
            userData = data.data();
            if(userData.location != null){
                locationField.value = userData.location;
            }
            if(phoneField.value == ""){
                if(userData.phone != null){
                    phoneField.value = userData.phone;
                }
            }
            loadingPage.style.display = "none";
            phoneField.onkeyup = function() {
                if(user.phoneNumber != null){
                    if(phoneField.value === user.phoneNumber){
                        changedPhone = false;
                    }else{
                        changedPhone = true;
                    }
                }else if(userData.phone != null){
                    if(phoneField.value === userData.phone){
                        changedPhone = false;
                    }else{
                        changedPhone = true;
                    }
                }
                changeColorLight();
            }
            firstNameField.onkeyup = function() {
                
                if(firstNameField.value + " " + lastNameField.value === user.displayName){
                    changedName = false;
                }else{
                    changedName = true;
                }
                changeColorLight();
            
            }
            lastNameField.onkeyup = function() {
                
                if(firstNameField.value + " " + lastNameField.value === user.displayName){
                    changedName = false;
                }else{
                    changedName = true;
                }
                changeColorLight();
            }
            emailField.onkeyup = function() {
                if(emailField.value === user.email){
                    changedEmail = false;
                }else{
                    changedEmail = true;
                }
                changeColorLight();
            }
            locationField.onkeyup = function() {
                if(locationField.value === userData.location){
                    changedLocation = false;
                }else{
                    changedLocation = true;
                }
                changeColorLight();
            }
        })
    }else{
        window.location.href = "index.html";
    }
})

function signOutUser(){
    signOut(auth);
    window.location.href = "login.html"
}
logOutBtn.addEventListener("click", signOutUser);

window.addEventListener('load', function() {
    document.querySelector("#file-upload").addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('#profile-pic');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
            
            if(this.files[0].size < 512000){
                const storage = getStorage();
                const storageRef = ref(storage, uid+'.png');
                const metadata = {
                    contentType: 'image/png',
                };
                // 'file' comes from the Blob or File API
                uploadBytes(storageRef, this.files[0], metadata).then((snapshot) => {
                    getDownloadURL(ref(storage, uid+'.png'))
                    .then((url)=>{
                        updateProfile(auth.currentUser, {photoURL: url})
                        img.src = URL.createObjectURL(this.files[0]); // set src to blob url
                        alert('Profile picture updated successfully!')
                    })
                });
                
            }else{
                alert('Please upload file with size under 500KB');
            }
        }
    });
});
saveBtn.onmouseover = function(){
    changeColorDark();
}
saveBtn.onmouseleave = function(){
    changeColorLight();
}

function changeColorLight(){
    if(changedEmail || changedLocation || changedName || changedPhone){
        saveBtn.style.backgroundColor = '#008523';
    }else{
        saveBtn.style.backgroundColor = 'gray';
    }
}
function changeColorDark(){
    if(changedEmail || changedLocation || changedName || changedPhone){
        saveBtn.style.backgroundColor = '#00611a';
    }else{
        saveBtn.style.backgroundColor = 'gray';
    }
}
saveBtn.addEventListener("click", updateUserProfile);
function updatedProfileAlert(){
    if(changedPhone || changedEmail || changedName || changedLocation){
        alert('Profile updated sucessfully');
        saveBtn.style.backgroundColor = "gray";
    }
}
function updateUserProfile() {
    const db = doc(firestore, 'users/'+uid)

    if(changedPhone){
        unlink(auth.currentUser, 'phone').then(() =>{

        }).catch((error) =>{
            console.log(error.code);
        })
        setDoc(db, {phone: phoneField.value}, {merge: true})
        .then((result)=>{
            updatedProfileAlert();
            verifyPhoneBtn.style.display = 'block';
            changedPhone = false;
        });
    }
    if(changedName){
        setDoc(db, {name: firstNameField.value + " " + lastNameField.value}, {merge: true});
        updateProfile(auth.currentUser, {displayName: firstNameField.value + " " + lastNameField.value})
        .then((result) =>{
            updatedProfileAlert();
            changedName = false;
        })
    }
    if(changedLocation){
        setDoc(db, {location: locationField.value}, {merge: true})
        .then((result) =>{
            updatedProfileAlert();
            changedLocation = false;
        })
    }
    if(changedEmail){
        updateEmail(auth.currentUser, emailField.value).then(() =>{
            setDoc(db, {email: emailField.value});
            updatedProfileAlert();
            window.location.reload();
            changedEmail = false;
        }).catch((error) =>{
            if(error.code == AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN)
            alert("Please login again to change your email!");
        })
    }
}

verifyEmailBtn.addEventListener('click', verifyEmail);
function verifyEmail() {
    sendEmailVerification(auth.currentUser)
    .then((result) =>{
        alert('Verification link sent to your Email!');
    })
}

verifyPhoneBtn.addEventListener('click', showPhnVerificationPopUp)
function showPhnVerificationPopUp() {
    document.querySelector("body > div.body-container > div.container").style.filter = 'blur(50px)';
    phoneVerificationPopup.style.display = 'flex';
    phoneFieldForPhoneVerification.value = userData.phone;
}
phoneVerificationPopup.addEventListener('click', function(e){
    if(e.target == this){
        phoneVerificationPopup.style.display = 'none';
        document.querySelector("body > div.body-container > div.container").style.filter = 'none';
    }
});

sendOtpBtn.addEventListener('click', getOTP);
function getOTP() {
    window.recaptchaVerifier = new RecaptchaVerifier('send-otp-button', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            
        }
    }, auth);

    const appVerifier = window.recaptchaVerifier;
    var userPhone = document.querySelector("#phone-for-verification").value;
    signInWithPhoneNumber(auth, userPhone, appVerifier)
    .then((confirmationResult) => {
        alert('OTP sent to your phone');
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
            // ...
        submitOtpBtn.style.backgroundColor = "#00B12F";
        submitOtpBtn.addEventListener("click", submitOTP);
        function submitOTP() {
            const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, otpField.value);
            linkWithCredential(auth.currentUser, credential)
            .then((result) =>{
                alert('Phone number verified successfully');
                window.location.reload();
                phoneVerificationPopup.style.display = 'none';
                document.querySelector("body > div.container").style.filter = 'none';
            })
            .catch((error)=>{
                console.log(error.code);
                if(error.code == AuthErrorCodes.INVALID_CODE){
                    errorMsgForPhoneVerification.textContent = "Wrong OTP, try again";
                    errorMsgForPhoneVerification.style.visibility = "visible";
                }else if(error.code == AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER){
                    errorMsgForPhoneVerification.textContent = "Too many attempts, try again later";
                    errorMsgForPhoneVerification.style.visibility = "visible";
                }
            })
        }
    }).catch((error) => {
        // Error; SMS not sent
        // ...
        if(error.code == AuthErrorCodes.INVALID_PHONE_NUMBER){
            errorMsgForPhoneVerification.textContent = "Invalid phone number, see if you are using the country code or not";
            errorMsgForPhoneVerification.style.visibility = 'visible';
        }
    });
}

phoneFieldForPhoneVerification.addEventListener('click', removeErrorMsg);
otpField.addEventListener('click', removeErrorMsg);

function removeErrorMsg(){
    errorMsgForPhoneVerification.style.visibility = "hidden";
}

changePassButton.onclick = function (){
    
}