"use strict";
const Category = require('./categoryRoutes');
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
 
}
exports.params = function(req, res, next, id) {
  Category.findById(id)
    .then(function(category) {
      if(!category) {
        next(new Error("no category found"));
      } else {
        req.category = category;
        next();
      }
    })
    .catch(function(err) {
      if(err) {
        next(new Error(err);
      }
    });
};

exports.get = function(req, res, next) {
  Category.findById({})
    .then(function(category) {
      res.json(category)
    })
    .catch(err) {
      if(err) {
        next(new Error(err));
      }
    }
}

exports.getOne = function(req, res, next) {
  let category = req.category;
  res.json(category);
}

exports.put = function(req, res, next) {
  const category = req.category;
  const update = req.body;
  _.$.merge(category, update);
  category.save(function(err, saved) {
    if(err) {
      next(new Error(err))
    }
    res.json(saved);
  })
}

exports.delete = function(req, res, next) {
  const category = req.category;

}
