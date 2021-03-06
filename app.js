import {setCookie,getCookie,clearCookie,checkCookie} from './models/cookie.js';
import {drawLogin, drawLoading} from './views/views.js';
import {drawOverview, drawDevices, loadModalEvents, reloadAll} from './views/viewsUsers.js';
import {drawAdminPanel, drawUsers} from './views/viewsAdmin.js';
import {get} from './models/http.js';
import {Light} from './models/devices/light.js';
import {Solarpanel} from "./models/devices/solarpanel.js";
import {User} from './models/user.js';
import {Speaker} from './models/devices/speaker.js';
export{validarLogin,validateModal};

//GLOBAL
let users = [];
let devices;
let id = 10;


function selectorLoad(rank){
  if(rank == "admin"){
    loadAppAdmin();
  }else{
    loadAppUser();
  }
}

async function loadAppUser(){
  let plainObj;
  devices;

  plainObj = await get("./JSON/devices.json");
  devices = createObjects(plainObj);
  drawOverview();
  drawDevices(devices);
}

// Controla si el usuario logueado es normal o admin
function loadAppAdmin(){
  drawAdminPanel();
  drawUsers(users);
}
// Descarga JSON de usuarios y transforma en objetos
async function getUsers(){
  let i = 0;
  let response = await get("./JSON/users.json",getUsers);
  
  saveLocal(response);

  for(let user of response){
    users[i++]=Object.assign(new User(),user);
  }

}
// Guarda en LocalStorage datos
const saveLocal = function(data){ //expresion de funcion 
      localStorage.setItem("users",JSON.stringify(data)); //json
}
// A aprtir de Objetos planos, crea objetos segun su tipo
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
      case "speaker": ; buildObj [i++] = Object.assign(new Speaker(),d);
                          break;
    }
  }
  return buildObj;
}
// A aprtir de Objetos planos, crea objetos segun su tipo i le asigna una ID.
function createNewObject(newDevice){
  switch(newDevice.type){
    case "light": newDevice = Object.assign(new Light(),newDevice);
                  newDevice.id = `L`+id++;
                    break;
    case "solarpanel": newDevice = Object.assign(new Solarpanel(),newDevice);
                        newDevice.id = `P`+id++;
                        break;
    case "speaker": ; newDevice = Object.assign(new Speaker(),newDevice);
                      newDevice.id = `S`+id++;
                        break;
  }
  return newDevice;
}
//Valida el login --> Trasladar a views
function validarLogin(){
  let name = document.getElementById("inputUsername").value;
  let passwd = document.getElementById("inputPassword").value;
  for(let user of users){
    if(user.nickname == name && comparePasswd(user.passwd,passwd)){
      setCookie("username",user.nickname, 365);
      selectorLoad(user.rank);
      }
    }
  }
//Compara la contraseña introducida con el hash de ususarios permitidos
function comparePasswd(hashKey,key){
    key = CryptoJS.SHA3(key);
    key = key.words;
    hashKey = hashKey.words;
    
    return key.toString() == hashKey.toString();
  }
//Recoge los datos introducidos del Modal y crea un objeto nuevo. --> trasladar a viewsUsers
function validateModal(){
    let form = document.querySelector("form");
    let formParts = form.querySelectorAll(".form-group");
    let inputs = [];
    let selects = [];
    let objectArray = [];
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
        input.value = "";
    }

    for(let select of selects){
        object += `"${select.name}":"${select.value}",`
        select.value = undefined;
        if(select.name == "brand" || select.name == "type"){
          select.value = "-";
        }
    }
    object += `"no":"no"}`;
    object = JSON.parse(object)
    object = createNewObject(object);
    objectArray.push(object);
    drawDevices(objectArray);
    reloadAll(devices);
    devices[devices.length] = object;
    loadModalEvents();;
  }

(()=>{
  'use strict'
  document.addEventListener("DOMContentLoaded", async function () { 
    let cookie;
    cookie = checkCookie();
    await getUsers();

    if(cookie == ""){
      drawLogin();
    }else{
      for(let u of users){
        if(u.nickname == cookie){
          selectorLoad(u.rank);
        }
      }
    }

  });
})();
