"use strict";
const app = require('./server/server');
const config = require('./server/config/config');
// simply require mongodb connection file

// app configuration here
app.listen(config.port);
console.log("Running on port " + config.port);
