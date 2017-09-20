"use strict";
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const nodemailer = require('nodemailer');
const config = require('../../config/config');
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

// const htmlData = fs.readFileSync('./templates/preview.html');

exports.sendmail = function(req, res, next) {
  const passwordReset = new EmailTemplate('./templates/preview');
  const data = {parag: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
  passwordReset.render(data, function(err, result) {
    console.log(result.html);
    if (err) return err;
    const msg = {
      to: 'nirajgeorgian01@gmail.com',
      from: 'test@example.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: result.html,
    };
    sgMail.send(msg, function(err, sended) {
      if (err) {
        res.status(401).json({"success": "failure"})
      } else {
        res.json(sended);
      }
    });
  })
}

// exports.sendmail = function(req,res,next) {
//     // middleware is here available
//     // req.user contains all data
//     // req.user.username req.user.firstname, req.user.lastname and req.user.email
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'everythinghere007@gmail.com',
//             pass: 'harryPOTTER'
//         },
//         tls: { rejectUnauthorized: false}
//     });
//     fs.readFile('./templates/accountSuccessEmail.html', function(err, data) {
//         if(err) console.log(err);
//         console.log(data);
//     var mailOptions = {
//         from: 'everythinghere007@gmail.com',
//         to: 'everythinghere007@gmail.com',   // req.user.email will be put here
//         subject: 'Node dummy email',
//         html: data
//     };
//
//     transporter.sendMail(mailOptions, function(error, response) {
//         if(error) console.log(error);
//         console.log('Message sent ' + response)
//     });
// })
// }
