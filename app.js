export{validarLogin,validateModal};
import {setCookie,getCookie,clearCookie,checkCookie} from './models/cookie.js';
import {drawLogin, drawOverview, drawDevices, errorLoad,  drawLoading, drawAdminPanel, loadModalEvents, reloadAll, drawUsers} from './views/views.js';
import {get} from './models/http.js';
import {Light} from './models/devices/light.js';
import {Solarpanel} from "./models/devices/solarpanel.js";
import {User} from './models/user.js';
import { Speaker } from './models/devices/speaker.js';

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

  plainObj = await get("http://127.0.0.1:5500/JSON/devices.json");
  devices = createObjects(plainObj);
  drawOverview();
  drawDevices(devices);
}

function loadAppAdmin(){
  drawAdminPanel();
  drawUsers(users);
}

async function getUsers(){
  let i = 0;
  let response = await get("http://127.0.0.1:5500/JSON/users.json",getUsers);

  for(let user of response){
    users[i++]=Object.assign(new User(),user);
  }

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
      case "speaker": ; buildObj [i++] = Object.assign(new Speaker(),d);
                          break;
    }
  }
  return buildObj;
}

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
  
  function comparePasswd(hashKey,key){
    key = CryptoJS.SHA3(key);
    key = key.words;
    hashKey = hashKey.words;
    
    return key.toString() == hashKey.toString();
  }

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
    devices[devices.length] = object;
    drawDevices(objectArray);
    console.log(devices);
    //reloadAll(devices)
    loadModalEvents();
  }

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

  


