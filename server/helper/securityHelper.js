const crypto = require('crypto');
const User = require('../api/user/userModel');
const Email = require('../api/uploads/uploadController');

exports.randomNumber = function(size, encoding='hex') {
  return (crypto.randomBytes(size)).toString(encoding);
}

exports.accountConfirm = function(req) {
  const code = (crypto.randomBytes(25)).toString('hex') + Date.now();
  let confirmation_mail = req.protocol + '://' + req.hostname + '/api/v1/users/account/' + code;
  return [code, confirmation_mail];
}

exports.passwordReset = function(req) {
  const code = (crypto.randomBytes(25)).toString('hex') + Date.now();
  let confirmation_mail = req.protocol + '://' + req.hostname + '/api/v1/users/password/' + code;
  return [code, confirmation_mail];
}

exports.confirmMail = function(req, res, next) {
  User.findOne({confirmation_code: req.params.token}, function(err, user) {
    if (err) {
      return next(err)
    }
    if(user) {
      let confirmation_mail = req.protocol + '://' + req.hostname + '/api/v1/users/account/' + user.confirmation_code
      let subject = "account confirmation email"
      let text = "Please verrify your account to get started"
      const data = {
        user: user.username,
        email: user.email,
        link: confirmation_mail
      }
      const done = Email.sendmail(req, res, next, user.email, subject, text, './templates/accountConfirmation', data)
      res.json({
        "success": "success",
        "message": "sended email confirmation link again successfully"
      })
    }
    else {
      return res.status(406).json({
        "success": "failute",
        "statusCode": 406,
        "message": "No user found with this " + req.params.token
      })
    }
  })
}
