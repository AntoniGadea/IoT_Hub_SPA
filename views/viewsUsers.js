import {overview, addModal} from '../templates/templates.js';
import {clearCookie} from '../models/cookie.js';
import {validateModal} from '../app.js';
import {drawLogin} from './views.js'
export {drawOverview, drawDevices, loadModalEvents, reloadAll};


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
        case "speaker": document.querySelector("#speakers").innerHTML += d.card();
                            break;
       }
   }
   loadCardEvents(devices);
}

function loadOverviewEvents(){
    let logOutBtn = document.body.querySelector("#logout");

    logOutBtn.addEventListener("click",()=>{clearCookie(),drawLogin();});
   loadModalEvents();
}

function loadModalEvents(){
    let addBtn = document.body.querySelector("#add");
    let modalBody = document.body.querySelector(".modal-body");
    let modalType = modalBody.querySelector("#modal-input");

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
    addBtn.addEventListener("click",validateModal);
}

function loadCardEvents(devices){
    for(let d of devices){
        switch(d.type){
         case "light": loadLights(d);
                         break;
         case "solarpanel": loadPanels(d);
                             break;
         case "fridge": fridgeCard(d);
                         break;
         case "speaker": loadSpeakers(d);
                             break;
        }
    }
}

function loadPanels(device){
    let card = document.getElementById(device.id);

    device.createChart();
    device.startRandomValues();

    card.querySelector(".close").addEventListener("click",()=>{card.remove()});
}

function loadLights(device){
    let card = document.getElementById(device.id);
    let button = card.querySelector(".btn");
    let colorpicker = card.querySelector(".colorpicker");
    card.d = device;

    button.addEventListener("click",()=>{
        if(card.d.status == "on"){
            card.d.off();
            reload(card.d);
        }else{
            card.d.on();
            reload(card.d);
        }
    });

    card.querySelector(".close").addEventListener("click",()=>{card.remove()});

    colorpicker.addEventListener("change",()=>{
        card.d.changeColor(colorpicker.value);
        reload(card.d);
    });
}

function loadSpeakers(device){
    let card = document.getElementById(device.id);

    card.querySelector(".close").addEventListener("click",()=>{card.remove()});
}

function reload(device){
    let cardContainer;
    switch(device.type){
        case "light": cardContainer = document.getElementById('C'+device.id);
                        cardContainer.innerHTML = "";
                        cardContainer.innerHTML = device.card();
                        loadLights(device);
                        break;
        case "solarpanel": device.chart = "";
                            loadPanels(device);
                            break;
        case "fridge": fridgeCard(d);
                        break;
        case "speacker": cardContainer = document.getElementById('S'+device.id);
                            cardContainer.innerHTML = "";
                            cardContainer.innerHTML = device.card();
                            loadSpeakers(device);
                            break;
       }
    
}

function reloadAll(devices){
    for(let d of devices){
        reload(d);
    }
}

//Segun el tipo elegido en el Modal, cargara una de las siguientes 3 funciones
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
    inputRgb.setAttribute("value","0");
    inputRgb.setAttribute("selected","selected");

    selectRgb.appendChild(inputRgb);

    inputRgb = document.createElement("option");
    inputRgb.appendChild(document.createTextNode("Yes"));
    inputRgb.setAttribute("value","1");

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

    let oldForm = document.body.querySelector("#insertModal");
    if(oldForm != null){
        oldForm.remove();
        document.body.querySelector("form").appendChild(modalLight);
    }else{
        document.body.querySelector("form").appendChild(modalLight);
    }
   
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

    let oldForm = document.body.querySelector("#insertModal");
    if(oldForm != null){
        oldForm.remove();
        document.body.querySelector("form").appendChild(modalPanel);
    }else{
        document.body.querySelector("form").appendChild(modalPanel);
    }
   
}

function modalSpeaker(){
    let oldForm = document.body.querySelector("#insertModal");
    if(oldForm != null){
        oldForm.remove();
    }
}
