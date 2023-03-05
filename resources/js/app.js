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
        for(let i =0 ; i < lnbBtn.length; i++){
            lnbBtn[i].classList.remove('on');
        }
        lnbBtn[0].classList.add('on');
        setTimeout(timer, 0);
        setInterval(timer, 1000);
    }
}
function logOut(){
    localStorage.removeItem('userName');
    localStorage.removeItem("todoLocal");
    todoList.innerHTML = "";
    loginWrap.classList.add('on');
    dashboard.classList.remove('on');
    clearInterval(timer);
}

const logInfo = localStorage.getItem('userName', valName);    
if(logInfo != null){
    loginWrap.classList.remove('on');
    dashboard.classList.add('on');
    userID.innerText = logInfo;
    setTimeout(timer, 0);
    setInterval(timer, 1000);
} else{
    loginWrap.classList.add('on');
    dashboard.classList.remove('on');
    clearInterval(timer);
}

signInBtn.addEventListener("click", logIn);


function lnbClick(event){
    for(let i =0 ; i < lnbBtn.length; i++){
        lnbBtn[i].classList.remove('on');
    }
    event.classList.add('on');
}

// lnbBtn.addEventListener("click", lnbClick);

const imgArea = document.querySelector('.random-img');
const txtArea = document.querySelector('.random-txt');
const pngImg = [
    {
        src: "img01.png",
        txt: "samsung"
    },
    {
        src: "img02.png",
        txt: "apple"
    },
    {
        src: "img03.png",
        txt: "google"
    },
    {
        src: "img04.png",
        txt: "naver"
    },
    {
        src: "img05.png",
        txt: "kakao"
    },
    {
        src: "img06.png",
        txt: "nc soft"
    },
    {
        src: "img07.png",
        txt: "line"
    },
    {
        src: "img08.png",
        txt: "lg"
    },
    {
        src: "img09.png",
        txt: "hyundai"
    },
    {
        src: "img10.png",
        txt: "nexon"
    }
];
const ramdomImg = pngImg[Math.floor(Math.random() * pngImg.length)];
imgArea.src = `./resources/img/${ramdomImg.src}`;
txtArea.innerText = ramdomImg.txt;


const clock = new Date();
const clockTxt = document.querySelector('.clock');
const week = ['일', '월', '화', '수', '목', '금', '토'];
function timer(){
    clockTxt.innerText = `${clock.getMonth()+1}월  ${clock.getDate()}일 (${week[clock.getDay()]}) ${String(clock.getHours()).padStart(2, '0')} : ${String(clock.getMinutes()).padStart(2, '0')}`;
}

const todoForm = document.querySelector('#to-do');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
let todoLocal = [];
function saveTodo(){
    localStorage.setItem("todoLocal", JSON.stringify(todoLocal));
}
function delTodo(event){
    const parent = event.target.parentElement.parentElement;
    parent.remove();
    todoLocal = todoLocal.filter((todo) => todo.id !== parseInt(parent.id));
    saveTodo();
}
function paintTodo(todoVal){
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = todoVal.txt;
    const button = document.createElement("button");
    // button.innerText = "X";

    button.innerHTML = "<i class='fa-regular fa-circle-xmark'></i>";
    button.addEventListener("click", delTodo);
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
    li.id = todoVal.id;
}
function todoSubmit(event){
    event.preventDefault();
    if(todoInput.value !== ""){
        const todoVal = todoInput.value;
        todoInput.value = "";
        const todoObject = {
            id: Date.now(),
            txt: todoVal
        }
        todoLocal.push(todoObject);
        paintTodo(todoObject);
        saveTodo();
    }
}
todoForm.addEventListener("submit", todoSubmit);

const savedTodos =localStorage.getItem("todoLocal");
if(savedTodos){
    const parsedTodo = JSON.parse(savedTodos);
    todoLocal = parsedTodo;
    parsedTodo.forEach(paintTodo);
}

const API_KEY = "68ce20b3f0e0c757f1d10c6a34efc3ef";
const weather = document.querySelector(".weather");
const city = document.querySelector(".city");

function onGeoOK(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = `location: ${data.name}`;
      weather.innerText = `weather: ${data.weather[0].main} / ${data.wind.speed}`;
    });
    console.log(url);
}

function onGeoError() {
    weather.innerText = "날씨 정보를 가져오지 못했어요🤔";
}

navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);
  