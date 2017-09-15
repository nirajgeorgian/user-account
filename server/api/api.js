"use strict";
const router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/categories', require('./category/categoryRoutes'));
router.use('/posts', require('./post/postRoutes'));

// export the router
module.exports = router;
