"use strict";
const Post = require('./postModel');
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

// we are expecting params to be id
exports.params = function(req, res, next, id) {
  Post.findById(id)
    .populate('author')
    .populate('category')
    .exec()
    .then(function(post) {
      if(!post) {
        next(new Error("data not available now"))
      } else {
        req.post = post;
        next();
      }
    })
    .catch(function(err) {
      next(new Error(err));
    })
}

exports.get = function(req, res, next) {
  Post.find({})
    .populate('author')
    .populate('category')
    .exec()
    .then(function(posts) {
      if(!posts) {
        next(new Error("no posts found"));
      } else {
        res.json(posts);
      }
    })
    .catch(function(err) {
      next(new Error(err));
    })
}

exports.getOne = function(req, res, next) {
  const post = req.post;
  res.json(post);
}

exports.post = function(req, res, next) {
  const posts = req.body;
  Post.create(posts)
    .then(function(post) {
      if(!post) {
        next(new Error("no post created"));
      } else {
        res.json(post)
      }
    })
    .catch(function(err) {
      next(new Error(err));
    })
}

exports.put = function(req, res, next) {
  const post = req.post;
  const update = req.body;
  _.$.merge(post, update);
  post.save(function(err, saved) {
    if (err) {
      next(err)
    } else {
      res.json(saved);
    }
  })
}

exports.delete = function(req, res, next) {
  req.post.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  })
}
