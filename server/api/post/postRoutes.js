"use strict";
const router = require('express').Router();
const auth = require('../../auth/auth');
const controller = require('./postController');

router.param('id', controller.params);
router.route('/')
  .get([auth.decodeToken()],controller.get)
  .post([auth.decodeToken()],controller.post)

router.route('/:id')
  .get([auth.decodeToken()],controller.getOne)
  .put([auth.decodeToken()],controller.put)
  .delete([auth.decodeToken()],controller.delete)

module.exports = router;
