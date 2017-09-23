"use strict";
const Tags = require('./tagsModel');

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

exports.getAll = function(req,res,next) {
    Tags.find({}, function(err, tags) {
        if(err) return err;
        res.json({"tags": "none"});
    })
}

exports.post = function(req,res,next) {
    tagsData = {};
    console.log(req.body);

    var NewTags = new Tags(tagsData);

    Tags.create(tagsData, function(err, tags) {
        if (err) return next(new Error('Something is wrong'));
        res.json({"done": "success"});
    })
}
