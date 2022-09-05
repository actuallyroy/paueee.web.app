//Get the button

var mybutton = document.getElementById("myBtn");
const usernameField = document.querySelector("#username");
const passwordField = document.querySelector("#password");
const nameField = document.querySelector("#name");
const btnSignup = document.querySelector("#signUpBtn");
const loginFormTitle = document.querySelector("#login-form-title");
const emailField = document.querySelector("#email");
const phoneField = document.querySelector("#\\#phone-input");
const btnLoginSignUp = document.querySelector("#login-signup-button");
var errorMsg = document.querySelector("#errorMsg");
const resetPassBtn = document.querySelector("#forgot-password-text");
const countryCodeField = document.querySelector("#c-code");

onSizeChange();
function onSizeChange(){
  if(document.body.clientWidth > 680){
    document.querySelector("body > div.menu-buttons").style.display = "flex";
  }else{
    document.querySelector("body > div.menu-buttons").style.display = "none";
  }
}

function scrollToLogin(){
  if(loginFormTitle.textContent == "Login"){
    showSignUp();
    setTimeout(() => {
      document.querySelector("#name").focus();
    }, 300);
  }else{
    document.querySelector("#name").focus();
  }
}
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function showHideMenu(){
let menuBtns = document.querySelector("body > div.menu-buttons");
console.log(menuBtns.style.display);
  if(menuBtns.style.display == "none"){
    menuBtns.style.display = "flex";
  }else{
    menuBtns.style.display = "none";
  }
}

function reset(field){
  field.style.border = "2px solid transparent";
}

function remove(elem) {
  let id = null;
  clearInterval(id);
  id = setInterval(anim, 5);
  let h = 35;
  function anim(){
      if(h <= 0){
          clearInterval(id);
          elem.style.display = "none";
      }else{
          h--;
          elem.style.height = h + "px";
          elem.style.fontSize = h*(17/35) + "px";
          elem.style.margin = h*(6/35) + "px";
          elem.style.opacity = h/35;
      }
  }
}
function bringBack(elem, as) {
  let id = null;
  clearInterval(id);
  id = setInterval(anim, 5);
  let h = 0;
  function anim(){
      if(h >= 35){
          clearInterval(id);
      }else{
        if(as == null){
          elem.style.display = "flex";
        }else{
          elem.style.display = as;
        }
          h++;
          elem.style.height = h + "px";
          elem.style.fontSize = h*(17/35) + "px";
          elem.style.margin = h*(6/35) + "px";
          elem.style.opacity = h/35;
      }
  }
}

var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("_image");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 2000); // Change image every 2 seconds
}

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
  document.getElementById('box').scrollIntoView({behavior: 'smooth'})
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("_gallary-image");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}

function clearFields() {
  nameField.value = "";
  emailField.value = "";
  phoneField.value = "";
  passwordField.value = "";
  usernameField.value = "";
  errorMsg.style.visibility = "hidden";
  reset(nameField);
  reset(emailField);
  reset(phoneField);
  reset(passwordField);
  reset(usernameField);
}

function showSignUp(){
  if(nameField.style.display == "none"){
    // nameField.style.display = "block";
    bringBack(nameField);
    // usernameField.style.display = "none";
    remove(usernameField);
    // emailField.style.display = "block";
    bringBack(phoneField);
    bringBack(emailField);
    bringBack(passwordField);
    // phoneField.style.display = "block";
    btnSignup.textContent = "Already have an account?";
    loginFormTitle.textContent = "Sign Up";
    btnLoginSignUp.textContent = "Sign Up";
    clearFields();
    resetPassBtn.style.display = "none";
  }else{
    // nameField.style.display = "none";
    remove(nameField);
    // usernameField.style.display = "block";
    bringBack(usernameField);
    // emailField.style.display = "none";
    remove(emailField);
    // phoneField.style.display = "none";
    remove(phoneField);
    //remove(phoneField);
    btnSignup.textContent = "Don't have an account?";
    loginFormTitle.textContent = "Login";
    btnLoginSignUp.textContent = "Login";
    clearFields();
    resetPassBtn.style.display = 'block';
    resetPassBtn.textContent = 'Forgot password?'
    resetPassBtn.style.color = 'rgb(255, 78, 78)';
    resetPassBtn.style.fontSize = '16px';
  }
}

resetPassBtn.addEventListener('click', showReset);
function showReset() {
  if(loginFormTitle.textContent != 'Reset Password'){
    remove(nameField);
    remove(phoneField);
    remove(passwordField);
    remove(usernameField);
    bringBack(emailField);
    loginFormTitle.textContent = 'Reset Password';
    btnLoginSignUp.textContent = 'Send link';
    resetPassBtn.textContent = 'Login';
    resetPassBtn.style.color = 'blue';
    resetPassBtn.style.fontSize = '20px';
  }else{
    bringBack(usernameField);
    bringBack(passwordField);
    remove(emailField);
    loginFormTitle.textContent = 'Login';
    btnLoginSignUp.textContent = 'Login';
    resetPassBtn.textContent = 'Forgot password?'
    resetPassBtn.style.color = 'rgb(255, 78, 78)';
    resetPassBtn.style.fontSize = '16px';
  }
}



nameField.onclick = function(e){
  reset(e.target);
  errorMsg.style.visibility = "hidden";
}
passwordField.onclick = function(e){
  reset(e.target);
  errorMsg.style.visibility = "hidden";
}
usernameField.onclick = function(e){
  reset(e.target);
  errorMsg.style.visibility = "hidden";
}
phoneField.onclick = function(e){
  phoneField.style.border = "none"
  errorMsg.style.visibility = "hidden";
}
emailField.onclick = function(e){
  reset(e.target);
  errorMsg.style.visibility = "hidden";
}
