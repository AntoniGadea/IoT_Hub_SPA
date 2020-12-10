import { overview, login, lightCard, addModal } from '../templates/templates.js';
import {setCookie,getCookie,clearCookie,checkCookie} from '../models/cookie.js';
import {validarLogin} from '../app.js';
export { drawLogin, drawOverview, drawDevices, errorLoad};

function clearView(selector){
    let node = document.getElementById(selector);
    node.innerHTML = ("");
    }

function drawLogin(){
    document.body.innerHTML = login;
    document.querySelector("#login").addEventListener("click",validarLogin);
}

function drawOverview(){
    document.body.innerHTML = overview;
    document.body.innerHTML += addModal;
    loadOverviewEvents();
}

function drawDevices(devices){
   for(let d of devices){
       switch(d.type){
        case "light": document.querySelector("#lights").innerHTML += d.card();
                        break;
        case "solarpanel": document.querySelector("#panels").innerHTML += d.card();
                            break;
        case "fridge": fridgeCard(d);
                        break;
        case "speacker": speackerCard(d);
                            break;
       }
   }
   loadCardEvents(devices);
}

function loadOverviewEvents(){
    let logOutBtn = document.body.querySelector("#logout");
    let addBtn = document.body.querySelector("#add");

    logOutBtn.addEventListener("click",()=>{clearCookie(),drawLogin()});
}

function loadCardEvents(devices){
    for(let d of devices){
        switch(d.type){
         case "light": loadLight(d);
                         break;
         case "solarpanel": loadPanel(d);
                             break;
         case "fridge": fridgeCard(d);
                         break;
         case "speacker": speackerCard(d);
                             break;
        }
    }
}

function loadPanel(device){
    document.getElementById(device.id);
    device.createChart(); 
}

function loadLight(device){
    let card = document.getElementById(device.id);
    let button = card.querySelector(".btn");
    let colorpicker = card.querySelector(".colorpicker");
    card.d = device;

    button.addEventListener("click",()=>{
        if(card.d.status == "on"){
            card.d.off();
            relaod(card.d);
        }else{
            card.d.on();
            relaod(card.d);
        }
    })

    card.querySelector(".close").addEventListener("click",()=>{card.remove()});

    colorpicker.addEventListener("change",()=>{
        card.d.changeColor(colorpicker.value);
        relaod(card.d);
    })
}

function relaod(device){
    let cardContainer = document.getElementById('C'+device.id);
    cardContainer.innerHTML = "";
    cardContainer.innerHTML = device.card();
    lightEvent(device);
}

function errorLoad(){
    let deck = document.getElementById("deck");
    let error = document.createElement("h1");
    error.style.color = "red";
    error.appendChild(document.createTextNode("Error Loading Devices, you are working offline"));
    deck.appendChild(error);
}