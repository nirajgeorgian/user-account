"use strict";
const router = require('express').Router();
const auth = require('../../auth/auth');
const controller = require('./categoryContoller');

// firstly get params here
router.param('id', controller.params);

router.route('/')
  .get([auth.headerToken()], controller.get)
  .post([auth.headerToken()], controller.post)

router.route('/:id')
  .get([auth.headerToken()], controller.getOne)
  .put([auth.headerToken()], controller.put)
  .delete([auth.headerToken()], controller.delete)

module.exports = router;
