"use strict";
const router = require('express').Router();
const auth = require('../../auth/auth');

router.route('/')
  .get(function(req, res, next) {
    res.send({ok: true});
  });

module.exports = router;
