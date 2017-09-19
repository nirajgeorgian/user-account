"use strict";
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

// globally allowed extname
const extensionName = ['.pdf','.jpg', '.jpeg', '.png'];

// multer options
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    crypto.randomBytes(10, function(err, buff) {
      if (err) return err;
      const fileName = buff.toString('hex') + '-' + Date.now() + path.extname(file.originalname);
      cb(null, fileName);
    });
  }
});

// let upload = multer({storage: storage});
exports.post = function(req, res, next) {
  let upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
      var extName = path.extname(file.originalname);
      if(extensionName.includes(extName)) {
        return cb(null, true);
      } else {
        return res.status(409).json({
          "success": "failure",
          "statusCode": 409
        });
      }
    }
  }).any();
  upload(req, res, function(err) {
    console.log(req.files);
    res.json({
      "success": "success",
      "mimetype": req.files[0].mimetype,
      "originalname": req.files[0].originalname,
      "path": req.files[0].path,
      "size": req.files[0].size
    });
  });
}
