import {loading, login} from '../templates/templates.js';
import {validarLogin} from '../app.js'
export {drawLoading, drawLogin, errorLoad};

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

function errorLoad(){
    let deck = document.getElementById("deck");
    let error = document.createElement("h1");
    error.style.color = "red";
    error.appendChild(document.createTextNode("Error Loading Devices, you are working offline"));
    deck.appendChild(error);
}