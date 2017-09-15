"use strict";
const router = require('express').Router();

router.route('/')
  .get(function(req, res, next) {
    return next(new Error("dodo bad thing"));
    res.send({ok: true});
  });

module.exports = router;
