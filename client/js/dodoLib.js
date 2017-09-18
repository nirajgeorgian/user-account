"use strict"
const get = function(url) {
  // want to convert XMLHttpRequest to promise based
  return new Promise(function(resolve, reject) {
    // do the XMLHttpRequest over here
    let req;  // request network will be saved over here
    // check to see for ajax
    if(window.XMLHttpRequest) {
      req = new XMLHttpRequest();
    } else if(window.ActiveXObject) {
      req = new ActiveXObject('Microsoft.XMLHTTP');
    } else {
      console.log("ajax not supported");
      return false;
    }
    req.open('GET', url);
    // network global onload and onerror for checking the status
    req.onload = function() {
      if(req.status == 200) {
        resolve(req.response);
      } else {
        reject(new Error(req.statusText));
      }
    }
    // onerror with network connecting
    req.onerror = function() {
      reject(new Error("network error"));
    }
    // finally make the request
    req.send();
  })
}
