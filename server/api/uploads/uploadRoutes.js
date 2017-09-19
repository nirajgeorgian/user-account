"use strict";
const router = require('express').Router();
const controller = require('./uploadController');

router.route('/')
  .get(function(req, res) {
    res.json({"done": "success"})
  })
  .post(controller.post);

 router.route('/sendEmail')
    .get(function(req,res) {
        res.json({"status": "success"})
    })
    .post(controller.sendmail);

module.exports = router;
