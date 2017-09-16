"use strict";
const User = require('../api/user/userModel');
const auth = require('./auth');

exports.signin = function() {
  return function(req, res, next) {
    // req.user will be here from auth web token
    // console.log(auth.signToken(req.user));
    // console.log(req.user._id);
    let token = auth.signToken(req.user._id);
    res.json(token);
  }
}
