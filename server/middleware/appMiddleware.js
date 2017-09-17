"use strict";
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cors());
}
