"use strict";
const multer = require('multer');

// multer options
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

// let upload = multer({storage: storage});
exports.post = function(req, res, next) {
  let upload = multer({storage: storage}).any();
  upload(req, res, function(err) {
    console.log(res);
    res.send('file uploaded');
  })
}
