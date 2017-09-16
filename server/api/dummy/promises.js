"use strict";

/*
--------- this one is using callback trace ---
const action = function(cb) {
  setTimeout(function() {
    cb("hey");
  }, 2000);
}

action(function(args) {
  console.log(args);
})

---- end -----------
*/

const action = function(cb) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve("heyy")
    }, 2000)
  })
}

/*
----- SIDE NOTe -------
calling action() like this will give us back one
promise because the abouve function is called and
the statement calls promise constructor
new Promise()
------ end --------
*/

action()
  .then(function(dodo) {
    console.log(dodo);
  })

/*
-------------- nodejs promise notes -------------------
nodejs style of coding is using hell lot of callbacks
but we can refactor it using promise based and can use native promise
api to access the data.
------------ end --------------------------------------
*/
const fs = require('fs');

const readFile = function() {
  return new Promise(function(resolve, reject) {
    fs.readFile('../../../package.json', function(err, data) {
      return err ? reject(err) : resolve(data.toString())
    })
  })
}

// array of promises resolve it with promise.all
const readFiles = function() {
  const promises = [readFile(), readFile(), readFile()]
  return Promise.all(promises);
}

readFiles()
  .then(function(data) {
    console.log(data);
  })

readFile()
  .then(function(data) {
    // it will give you data because of above function
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  })

// another example
  const fs = require('fs');

  const readFile = function() {
    return new Promise(function(resolve, reject) {
      fs.readFile('./package.json', function(err, data) {
        return err ? reject(err) : resolve(data.toString())
      })
    })
  }

  readFile()
    .then(function(data) {
      // it will give you data because of above function
      console.log(data);
    })
    .catch(function(err) {
      console.log(err);
    })
