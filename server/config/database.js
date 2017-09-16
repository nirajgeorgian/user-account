
const mongoose = require('mongoose');
// use native promise api instead of mpromise
mongoose.Promise = require('bluebird');
const config = require('./config');

// connect to the database
let connection = mongoose.connect(config.db.url,{ useMongoClient: true }, function(err, conn) {
  if (err) return err;
});

connection
  .then(function(db) {
    console.log("successfully connected to " + config.db.url);
  })
  .catch(function(err) {
    console.log(err);
  })
