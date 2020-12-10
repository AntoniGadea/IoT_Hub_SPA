export {XMLRequest, get}
import {errorLoad} from "../views/views.js";

function XMLRequest (url, done) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {   done(null, xhr.response); };
    xhr.onerror = function () {   done(xhr.response); };
    xhr.send();
    }

function get(url,error) {

    let fetchOptions = {
        method: 'get',
        headers: { "Content-type": "application/json; charset=UTF-8" },
      };

    let response = fetch(url, fetchOptions)
                    .then((response)=>response.json())
                    .catch(error);

    return response;
}


