"use strict";
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config/config');
const checkToken = expressJwt({secret: config.secrets.jwt})
const User = require('../api/user/userModel');

exports.signToken = function(id) {
  return jwt.sign(
    {_id: id},
    config.secrets.jwt,
    {expiresIn: config.expireTime}
  )
}

exports.decodeToken = function() {
  return function(req, res, next) {
    if(req.query && req.query.hasOwnProperty('access_token')) {
      console.log("you are here");
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }
    checkToken(req, res, next);
    // next();
  }
}

exports.getFreshUser = function() {
  return function(req, res, next) {
    User.findById(req.user._id)
      .then(function(user) {
        if(!user) {
          // if no user was found then it was a valid jwt but the user token was expired or user was deleted
          res.status(401).send("Unauthorised access")
        } else {
          req.user = user;
          next();
        }
      })
      .catch(function(err) {
        next(err);
      })
  }
}

exports.verifyUser = function() {
  return function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    // check for username
    if(!username || !password) {
      next();
      res.status(400).send("You need a username and password")
    }
    // or else the username is available for furthe lookup
    User.findOne({username: username})
      .then(function(user) {
        if(!user) {
          res.status(401).send("No user associated with this " + username)
        } else {
          if(!user.authenticate(password)) {
            res.status(401).send("wrong password")
          } else {
            // everything is good "walla" update req.user = { _id: id } to full user object
            req.user = user;
            next();
          }
        }
      }, function(err) {
        next(err);
      })
  }
}
