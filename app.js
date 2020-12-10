export{validarLogin};
import {setCookie,getCookie,clearCookie,checkCookie} from './models/cookie.js';
import {drawLogin, drawOverview, drawDevices, errorLoad} from './views/views.js';
import {get} from './models/http.js';
import {Light} from './models/devices/light.js';
import {Solarpanel} from "./models/devices/solarpanel.js";
import {User} from './models/user.js';

function loadApp(){
  get("http://127.0.0.1:5500/JSON/devices.json",online,offline);
}

async function online(response){
  let plainObj;
  let devices;

  plainObj = await response.json();
  saveLocal(plainObj);
  devices = createObjects(plainObj);
  drawOverview();
  drawDevices(devices);
}

function offline(){
  let plainObj;
  let devices;

  plainObj = localStorage.getItem(checkCookie());
  plainObj = JSON.parse(plainObj);
  devices = createObjects(plainObj);
  drawOverview();
  drawDevices(devices);
  errorLoad();
}

function createObjects(devices){
  let buildObj = [];
  let i = 0;

  for(let d of devices){
    switch(d.type){
      case "light": buildObj [i++] = Object.assign(new Light(),d);
                      break;
      case "solarpanel": buildObj [i++] = Object.assign(new Solarpanel(),d);
                          break;
      case "fridge": ;
                      break;
      case "speacker": ;
                          break;
    }
  }
  return buildObj;
} 

function saveLocal(obj){
  let json = JSON.stringify(obj);
  localStorage.setItem(checkCookie(),json);
}

function validarLogin(){
  let user = document.getElementById("inputUsername").value;
  let passwd = document.getElementById("inputPassword").value;
  
  if(user == "toni" && passwd == "1234"){
    //Create Cookie
    setCookie("username",user, 365);
    loadApp();
    //Load main menu
    //Load user
    //client.name = user;
    //client.loadPhoto();
    //client.loadStatus();
  }else{
    alert(`Usuario o contraseña incorrecta
            Usuario: toni
            Contrasenya: 1234`);}
  }


  document.addEventListener("DOMContentLoaded", function () {

    if(checkCookie() != null){
      loadApp();
    }else{
      drawLogin();
    }  
  });




