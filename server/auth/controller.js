"use strict";
const User = require('../api/user/userModel');
const auth = require('./auth');

exports.signin = function() {
  return function(req, res, next) {
    // req.user will be here from auth web token
    // console.log(auth.signToken(req.user));
    // console.log(req.user._id);
    let token = auth.signToken(req.user._id);
    req.headers.authorization = 'Bearer ' + token;
    console.log(req.headers);
    res.json({
    "token": token
    });
  }
}
