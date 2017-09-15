"use strict";
const _ = require('lodash');

// default config object for our api
const config = {
  dev: "development",
  prod: "production",
  test: "testing",
  port: process.env.PORT || 3000,
};
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

// set the env value to whichever mode you are working on
config.env = process.env.NODE_ENV;

// conditionally in time movie
let envConfig;
try {
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
} catch(e) {
  envConfig = {};
}
module.exports = _.merge(config, envConfig);
