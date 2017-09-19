"use strict";
const express = require('express');
const api = require('./api/api');
const auth = require('./auth/routes')
const app = express();
require('./config/database');

// setup the app middleware
require('./middleware/appMiddleware')(app);
const err = require('./middleware/errMiddleware');

// setup the api
app.use('/api', api);
app.use('/auth', auth)
// app.use(err());
app.use(function(err,req, res, next) {
  if(err.name == 'UnauthorizedError') {
    res.status(401).json({
      "success": "failure",
      "message": "Invalid token",
      "statusCode": 401,
    });
  } else {
    res.status(500).json({
      "success": "failure",
      "message": "Server error",
      "statusCode": 500
    });
  }
})

// export for testing
module.exports = app;
