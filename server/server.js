"use strict";
const express = require('express');
const api = require('./api/api');
const app = express();

// setup the app middleware
require('./middleware/appMiddleware')(app);
const err = require('./middleware/errMiddleware');

// setup the api
app.use('/api', api);
app.use(err());

// export for testing
module.exports = app;
