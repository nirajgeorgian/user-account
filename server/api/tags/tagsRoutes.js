"use strict";
const router = require('express').Router();
const controller = require('./tagsController');

router.param("id", controller.params);

router.route('/').get(controller.getAll).post(controller.post);

module.exports = router;
