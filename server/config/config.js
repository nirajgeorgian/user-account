"use strict";
require('dotenv').config()
const _ = require('lodash');

// default config object for our api
const config = {
  dev: "development",
  prod: "production",
  test: "testing",
  port: process.env.PORT || 3000,
  expireTime: 24 * 60 * 60 * 10,
  secrets: {
    jwt: process.env.JWT || 'OoOO'
  },
  sendgrid_env_key: process.env.SENDGRID_API_KEY,
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
