"use strict";
const router = require('express').Router();
const auth = require('../../auth/auth');
const controller = require('./userController');

// just invoking the params property
router.param('id', controller.params)

router.route('/:id')
  .get([auth.headerToken()], controller.getOne)
  .put(auth.headerToken(), controller.put)
  .delete([auth.headerToken()], controller.delete)

// forgot password
router.route('/password')
  .post(controller.sendPasswordReset)

router.route('/password/:token')
  .get(controller.passwordReset)
  .post(controller.postResetPassword)


// routes for account details for email activation password reset etc
router.route('/account/:token')
  .get(controller.get)
  .post(controller.resend)

router.route('/')
  .get([auth.headerToken()], controller.get)
  .post(controller.post)

module.exports = router;
