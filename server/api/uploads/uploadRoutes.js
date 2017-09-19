"use strict";
const router = require('express').Router();
const controller = require('./uploadController');

router.route('/')
  .get(function(req, res) {
    res.json({"done": "success"})
  })
  .post(controller.post);

module.exports = router;
