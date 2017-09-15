"use strict";
const router = require('express').Router();

router.route('/')
  .get(function(req, res, next) {
    res.send({ok: true});
  });

module.exports = router;
