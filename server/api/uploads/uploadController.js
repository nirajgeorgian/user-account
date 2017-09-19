"use strict";
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const nodemailer = require('nodemailer');

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

exports.sendmail = function(req,res,next) {
    // middleware is here available
    // req.user contains all data
    // req.user.username req.user.firstname, req.user.lastname and req.user.email
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'everythinghere007@gmail.com',
            pass: 'harryPOTTER'
        },
        tls: { rejectUnauthorized: false}
    });
    fs.readFile('./templates/accountSuccessEmail.html', function(err, data) {
        if(err) console.log(err);
        console.log(data);
    var mailOptions = {
        from: 'everythinghere007@gmail.com',
        to: 'everythinghere007@gmail.com',   // req.user.email will be put here
        subject: 'Node dummy email',
        html: data
    };

    transporter.sendMail(mailOptions, function(error, response) {
        if(error) console.log(error);
        console.log('Message sent ' + response)
    });
})
}
