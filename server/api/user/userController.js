"use strict";
const User = require('./userModel');
const auth = require('../../auth/auth');
const _ = require('lodash');

/*
----- another way of doing is using module.exports ---
module.exports = {
params: function() {},
get: function() {},
gerOne: function() {}
 and so on
 ------ end -----
 */

exports.params = function(req, res, next, id) {
  User.findById(id)
    .populate('connections')
    .exec()
    .then(function(user) {
      if(!user) {
        next(new Error("no user found"))
      } else {
        req.user = user;
        next();
      }
    })
    .catch(function(err) {
      if(err) {
        next(new Error(err));
      }
    })
}

exports.get = function(req, res, next) {
  User.find({})
    .populate('connections')
    .then(function(users) {
      if(!users) {
        next(new Error('no users found'))
      } else {
        res.json(users);
      }
    })
    .catch(function(err) {
      next(new Error(err));
    })
}

exports.getOne = function(req, res, next) {
  const user = req.user;
  res.json(user);
}

exports.post = function(req, res, next) {
  const newUser = req.body;
  User.create(newUser)
    .then(function(user) {
      const token = auth.signToken(user._id);
      req.headers.authorization = 'Bearer ' + token
      res.json({token: token});
    }, function(err) {
      next(new Error(err));
    })
}

exports.put = function(req, res, next) {
  const user = req.user;
  const update = req.body;
  _.merge(user, update);
  user.save(function(err, saved) {
    if(err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
}

exports.delete = function(req, res, next) {
  req.user.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
}
