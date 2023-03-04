const username = document.getElementById('username');
const signInBtn = document.querySelector('.sign-in');
const loginWrap = document.querySelector('.login-wrap');
const dashboard = document.querySelector('.dashboard');
const error = document.querySelector('.error');
const lnbBtn = document.querySelectorAll('.lnb-btn');
const userID = document.querySelector('.userID');

let valName;

function logIn(){
    valName = username.value;
    if(valName.length > 6){
        error.innerText = "Please enter 6 characters or less";
        error.classList.add('on');
    } else if(valName == ""){
        error.innerText = "Please enter at least one character";
        error.classList.add('on');
    } else{
        error.classList.remove('on');
        loginWrap.classList.remove('on');
        dashboard.classList.add('on');
        localStorage.setItem('userName', valName);
        userID.innerText = valName;
    }
}
function logOut(){
    localStorage.removeItem('userName');
    loginWrap.classList.add('on');
    dashboard.classList.remove('on');
}

const logInfo = localStorage.getItem('userName', valName);    
if(logInfo != null){
    loginWrap.classList.remove('on');
    dashboard.classList.add('on');
    userID.innerText = logInfo;
} else{
    loginWrap.classList.add('on');
    dashboard.classList.remove('on');
}

signInBtn.addEventListener("click", logIn);


function lnbClick(event){
    for(let i =0 ; i < lnbBtn.length; i++){
        lnbBtn[i].classList.remove('on');
    }
    event.classList.add('on');
}

// lnbBtn.addEventListener("click", lnbClick);