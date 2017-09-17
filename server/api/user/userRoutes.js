"use strict";
const router = require('express').Router();
const auth = require('../../auth/auth');
const controller = require('./userController');

// just invoking the params property
router.param('id', controller.params)

router.route('/:id')
  .get([auth.decodeToken()],controller.getOne)
  .put([auth.decodeToken()],controller.put)
  .delete([auth.decodeToken()],controller.delete)

router.route('/')
  .get([auth.decodeToken()],controller.get)
  .post(controller.post)

module.exports = router;
