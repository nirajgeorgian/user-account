"use strict";
const router = require('express').Router();
const auth = require('../../auth/auth');
const controller = require('./userController');

// just invoking the params property
router.param('id', controller.params)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

router.route('/')
  .get(controller.get)
  .post(controller.post)

module.exports = router;
