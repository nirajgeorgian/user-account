"use strict";
const router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/categories', require('./category/categoryRoutes'));
router.use('/posts', require('./post/postRoutes'));
<<<<<<< HEAD
router.use('/upload', require('./uploads/uploadRoutes'))
router.use('/tags', require('./tags/tagsRoutes'));
=======
router.use('/upload', require('./uploads/uploadRoutes'));
>>>>>>> master

// export the router
module.exports = router;
