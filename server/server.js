"use strict";
const express = require('express');
const api = require('./api/api');
const app = express();

// setup the app middleware
require('./middleware/appMiddleware')(app);

// setup the api
app.use('/api', api);

// setup global error handling
app.use(function(err, req, res, next) {
  if(err) {
    res.status(500).send(err);
  }
  // everything is good
  next();
})

// export for testing
module.exports = app;
