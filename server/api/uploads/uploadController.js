"use strict";
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const nodemailer = require('nodemailer');
const config = require('../../config/config')
const EmailTemplate = require('email-templates').EmailTemplate;

// required for sending mail
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgrid_env_key);

// globally allowed extname
const extensionName = ['.jpg', '.jpeg', '.png'];

// multer options
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    crypto.randomBytes(10, function(err, buff) {
      if (err) return err;
      const fileName = buff.toString('hex') + '-' + Date.now() + (path.extname(file.originalname)).toLowerCase();
      cb(null, fileName);
    });
  }
});

// sendGrid options
// var apiKey = process.env.SENDGRID_API_KEY || config.sendgridKey;

// let upload = multer({storage: storage});
exports.post = function(req, res, next) {
  let upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
      var extName = (path.extname(file.originalname)).toLowerCase();
      if(extensionName.includes(extName)) {
        return cb(null, true);
      } else {
        return res.status(409).json({
          "success": "failure",
          "statusCode": 409,
          "message": "only images are allowed"
        });
      }
    }
  }).any();
  upload(req, res, function(err) {
    fs.chmod(req.files[0].path, 0o444, function(err, done) {
      if (err) return next(err);
      res.json({
        "success": "success",
        "mimetype": req.files[0].mimetype,
        "originalname": req.files[0].originalname,
        "path": req.files[0].path,
        "size": req.files[0].size
      });
    })
    console.log(req.files[0].path);
  });
}

const htmlData = fs.readFileSync('./templates/accountSuccessEmail.html');

exports.sendmail = function(req, res, next, to, subject, text, template, data, from='nirajgeorgian01@gmail.com') {
  const passwordReset = new EmailTemplate(template);
  passwordReset.render(data, function(err, result) {
    if (err) return err;
    const msg = {
      to: to,
      from: 'nirajgeorgian01@gmail.com',
      subject: subject,
      text: text,
      html: result.html,
    };
    sgMail.send(msg, function(err, sended) {
      if (sended) {
        next();
      } else {
        return res.status(401).json({"success": "failure"});
      }
    });
  })
}
