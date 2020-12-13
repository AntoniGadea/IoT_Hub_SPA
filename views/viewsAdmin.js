import {adminPanel} from '../templates/templates.js';
import {drawLogin} from './views.js';
import {clearCookie} from '../models/cookie.js';
export{drawAdminPanel, drawUsers};

function drawAdminPanel(){
    document.body.innerHTML = adminPanel;
    loadAdminOverviewEvents();
}

function loadAdminOverviewEvents(){
    let logOutBtn = document.body.querySelector("#logout");
    let addBtn = document.body.querySelector("#add");

    logOutBtn.addEventListener("click",()=>{clearCookie(),drawLogin();});
    addBtn.addEventListener("click",()=>{alert("Cuant tinga backend anira <3");});
}

function drawUsers(users){
    for(let u of users){
       document.querySelector("#deck").innerHTML += u.card()
    }
 }