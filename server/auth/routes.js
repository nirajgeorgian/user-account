"use strict";
const router = require('express').Router();
const controller = require('./controller');
const auth = require('./auth');
const User = require('../api/user/userModel');


router.post('/signin', auth.verifyUser(), controller.signin())

module.exports = router;
