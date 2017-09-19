"use strict";
const router = require('express').Router();
const auth = require('../../auth/auth');
const controller = require('./userController');

// just invoking the params property
router.param('id', controller.params)

router.route('/:id')
  .get(controller.getOne)
  .put(auth.decodeToken(), controller.put)
  .delete([auth.decodeToken()],controller.delete)

router.route('/')
  .get([auth.headerToken()],controller.get)
  .post(controller.post)

module.exports = router;
