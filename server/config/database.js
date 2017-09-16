"use strict";
const mongoose = require('mongoose');
// use native promise api instead of mpromise
mongoose.Promise = global.Promise;
const config = require('./config');

// connect to the database
const connection = mongoose.createConnection(config.dbPath, {
  useMongoClient: true,
})
connection
  .then(function(db) {
    console.log("successfully connected to " + config.dbPath);
  })
  .catch(function(err) {
    console.log(err);
  })
