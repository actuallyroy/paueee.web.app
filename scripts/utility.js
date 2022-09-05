export function loadingAnimation(){
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
}

export const firebaseConfig = {
    apiKey: "AIzaSyCb-TCCOXnPtBU0PpQwU7RJrgjxK9BeMng",
    authDomain: "teacher-mignon.firebaseapp.com",
    projectId: "teacher-mignon",
    storageBucket: "teacher-mignon.appspot.com",
    messagingSenderId: "980519638773",
    appId: "1:980519638773:web:5a89b64e00157f851457bc",
    measurementId: "G-N4BBN6VPBF"
}