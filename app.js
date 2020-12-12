export{validarLogin};
import {setCookie,getCookie,clearCookie,checkCookie} from './models/cookie.js';
import {drawLogin, drawOverview, drawDevices, errorLoad,  drawLoading} from './views/views.js';
import {get} from './models/http.js';
import {Light} from './models/devices/light.js';
import {Solarpanel} from "./models/devices/solarpanel.js";
import {User} from './models/user.js';

//GLOBAL
let users = [];

async function online(){
  let plainObj;
  let devices;

  plainObj = await get("http://127.0.0.1:5500/JSON/devices.json",offline);
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

async function getUsers(){
  let i = 0;
  let response = await get("http://127.0.0.1:5500/JSON/users.json",getUsers);

  for(let user of response){
    users[i++]=Object.assign(new User(),user);
  }
  console.log(users);
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
  let name = document.getElementById("inputUsername").value;
  let passwd = document.getElementById("inputPassword").value;

  for(let user of users){
    if(user.nickname == name && comparePasswd(user.passwd,passwd)){
      setCookie("username",user, 365);
      online();
      }
    }
  }
  
  function comparePasswd(hashKey,key){
    key = CryptoJS.SHA3(key);
    key = key.words;
    hashKey = hashKey.words;
    
    return key.toString() == hashKey.toString();
  }

  document.addEventListener("DOMContentLoaded", function () {

    const START = new Promise(async function(resolve,reject){
                  drawLoading();
                  await getUsers();
                  
                  if(getCookie("username") == ""){
                    reject();
                  }else{
                    resolve();
                  }
                })
      .then(online)
      .catch(drawLogin);
  });




