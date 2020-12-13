import { overview, login, lightCard, addModal, loading, adminPanel} from '../templates/templates.js';
import {setCookie,getCookie,clearCookie,checkCookie} from '../models/cookie.js';
import {validarLogin,createObjects} from '../app.js';
import {Light} from '../models/devices/light.js';
import {Solarpanel} from "../models/devices/solarpanel.js";
import { Speaker } from '../models/devices/speaker.js';
export { drawLogin, drawOverview, drawDevices, errorLoad,  drawLoading, drawAdminPanel};

function clearView(selector){
    let node = document.getElementById(selector);
    node.innerHTML = ("");
    }

function drawLoading(){
document.body.innerHTML = loading;
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

function drawAdminPanel(){
    document.body.innerHTML = adminPanel;
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
        case "speaker": document.querySelector("#speakers").innerHTML += d.card();
                            break;
       }
   }
   loadCardEvents(devices);
}

function loadOverviewEvents(){
    let logOutBtn = document.body.querySelector("#logout");
    let addBtn = document.body.querySelector("#add");
    let modalBody = document.body.querySelector(".modal-body");
    let modalType = modalBody.querySelector("#modal-input"); 

    logOutBtn.addEventListener("click",()=>{clearCookie(),drawLogin();});
    modalType.addEventListener("change",()=>{
        switch(modalType.value){
            case("light"):modalLight();
                            break;
            case("solarpanel"):modalSolarPanel();
                                break;
            case("speaker"): modalSpeaker();
                                break;
        }
    })
    addBtn.addEventListener("click",checkModal);
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
    });

    card.querySelector(".close").addEventListener("click",()=>{card.remove()});

    colorpicker.addEventListener("change",()=>{
        card.d.changeColor(colorpicker.value);
        relaod(card.d);
    });
}

function relaod(device){
    let cardContainer = document.getElementById('C'+device.id);
    cardContainer.innerHTML = "";
    cardContainer.innerHTML = device.card();
    loadLight(device);
}

function errorLoad(){
    let deck = document.getElementById("deck");
    let error = document.createElement("h1");
    error.style.color = "red";
    error.appendChild(document.createTextNode("Error Loading Devices, you are working offline"));
    deck.appendChild(error);
}

function modalLight(){
    let modalLight;
    let formGroup1;
    let formGroup2;
    let labelRgb;
    let labelPower;
    let selectRgb;
    let inputRgb;
    let inputPower;

    modalLight = document.createElement("div");
    modalLight.setAttribute("id","insertModal");

    formGroup1 = document.createElement("div");
    formGroup1.setAttribute("class","form-group");
    formGroup2 = document.createElement("div");
    formGroup2.setAttribute("class","form-group");
    
    labelRgb = document.createElement("label");
    labelRgb.appendChild(document.createTextNode("RGB:"));
    labelRgb.setAttribute("for","rgb");
    labelRgb.setAttribute("class","col-form-label");

    labelPower = document.createElement("label");
    labelPower.appendChild(document.createTextNode("Power (W):"));
    labelPower.setAttribute("for","power");
    labelPower.setAttribute("class","col-form-label");

    selectRgb = document.createElement("select");
    selectRgb.setAttribute("name","rgb");
    
    inputRgb = document.createElement("option");
    inputRgb.appendChild(document.createTextNode("No"));
    inputRgb.setAttribute("value","no");
    inputRgb.setAttribute("selected","selected");

    selectRgb.appendChild(inputRgb);

    inputRgb = document.createElement("option");
    inputRgb.appendChild(document.createTextNode("Yes"));
    inputRgb.setAttribute("value","yes");

    selectRgb.appendChild(inputRgb);

    inputPower = document.createElement("input");
    inputPower.setAttribute("type","text");
    inputPower.setAttribute("name","power");
    inputPower.setAttribute("class","form-control");

    formGroup1.appendChild(labelRgb);
    formGroup1.appendChild(selectRgb);
    formGroup2.appendChild(labelPower);
    formGroup2.appendChild(inputPower);
    
    modalLight.appendChild(formGroup1);
    modalLight.appendChild(formGroup2);

    document.body.querySelector("#insertModal").remove();
    document.body.querySelector("form").appendChild(modalLight);
}

function modalSolarPanel(){
    let modalPanel;
    let formGroup1;
    let labelMax;
    let inputMax;

    modalPanel = document.createElement("div");
    modalPanel.setAttribute("id","insertModal");

    formGroup1 = document.createElement("div");
    formGroup1.setAttribute("class","form-group");

    labelMax = document.createElement("label");
    labelMax.setAttribute("for","max")
    labelMax.appendChild(document.createTextNode("Max power production"))

    inputMax = document.createElement("input");
    inputMax.setAttribute("type","text");
    inputMax.setAttribute("name","max")

    formGroup1.appendChild(labelMax);
    formGroup1.appendChild(inputMax);

    modalPanel.appendChild(formGroup1);

    document.body.querySelector("#insertModal").remove();
    document.body.querySelector("form").appendChild(modalPanel);
}

function modalSpeaker(){
    document.body.querySelector("#insertModal").remove();
}

function checkModal(){
    let form = document.querySelector("form");
    let formParts = form.querySelectorAll(".form-group");
    let inputs = [];
    let selects = [];
    let object = `{`;

    for(let i=0;i<formParts.length;i++){
        if(formParts[i].querySelector("input") != null)
            inputs[i] = formParts[i].querySelector("input");
        if(formParts[i].querySelector("select") != null)
        selects[i] = formParts[i].querySelector("select");
    }
    inputs = inputs.filter(e => e != "empty");
    inputs = inputs.sort();
    selects = selects.filter(e => e != "empty");
    selects = selects.sort();

    for(let input of inputs){
        object += `"${input.name}":"${input.value}",`
    }

    for(let select of selects){
        object += `"${select.name}":"${select.value}",`
    }
    object += `"no":"no"}`;
    object = JSON.parse(object)
    console.log(object.type);
    switch(object.type){
        case "light": object = Object.assign(new Light(),object);
                        break;
        case "solarpanel": object = Object.assign(new Solarpanel(),object);
                            break;
        case "speaker": ; object = Object.assign(new Speaker(),object);
                            break;
      }
      let devices  = [];
      devices.push(object)
      drawDevices(devices);
}