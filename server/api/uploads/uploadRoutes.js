"use strict";
const router = require('express').Router();
const controller = require('./uploadController');
const auth = require('../../auth/auth');

router.route('/')
  .get(function(req, res) {
    res.json({"done": "success"})
  })
  .post(controller.post);

 router.route('/sendmail')
    .get([auth.headerToken()], controller.sendmail);

module.exports = router;
