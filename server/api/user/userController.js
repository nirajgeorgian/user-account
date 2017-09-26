"use strict";
const url = require('url');
const crypto = require('crypto');
const User = require('./userModel');
const auth = require('../../auth/auth');
const securityHelper = require('../../helper/securityHelper');
const Email = require('../uploads/uploadController');
const _ = require('lodash');

/*
----- another way of doing is using module.exports ---
module.exports = {
params: function() {},
get: function() {},
gerOne: function() {}
 and so on
 ------ end -----
 */

exports.params = function(req, res, next, id) {
  User.findById(id)
    .populate('user')
    .exec()
    .then(function(user) {
      if(!user) {
        next(new Error("no user found"))
      } else {
        req.Cuser = user;
        next();
      }
    })
    .catch(function(err) {
      if(err) {
        next(new Error(err));
      }
    })
}

exports.get = function(req, res, next) {
  if(req.params.token) {
    User.findOne({confirmation_code: req.params.token}, function(err, user) {
      if (err) {
        return next(err)
      }
      if(!user) {
        res.status(406).json({
          "success": "failure",
          "message": "no user found with this verification code"
        })
      } else {
        user.confirmation_code = null;
        user.confirmed = true;
        user.confirmed_date = Date.now()
        user.save(function(err, saved) {
          if (err) {
          }
          const data = {
            message: 'Thankyou for activating your account. Get started with OoOO blogging platform',
            user: saved
          }
          let subject = "Account successfully activated";
          let text = "Enjoy the free bebefit with open source blogginf platfrom OoOO";

          Email.sendmail(req, res, next, user.email, subject, text, './templates/accountConfirmation', data);
          Email.sendmail(req, res, next, saved.email, subject, text, './templates/confirmation', data);
          res.json(saved)
        })
      }
    })
  } else {
    User.find({})
    .populate('connections')
    .then(function(users) {
      if(!users) {
        next(new Error('no users found'))
      } else {
        res.json(users);
      }
    })
    .catch(function(err) {
      next(new Error(err));
    })
  }
}

exports.getOne = function(req, res, next) {
  let currentUser = req.Cuser;
  console.log(currentUser);
  res.json(currentUser);
}

exports.post = function(req, res, next) {
  let newUser = req.body;
  const code = securityHelper.accountConfirm(req);
  newUser.confirmation_code = code[0];
  // generate random code but first check if code is available or not
  User.findOne({email: req.body.email}, function(err, person) {
    if (err) {
      return next(err);
    }
    if(person) {
      return res.status(409).json({
        "success": "failure",
        "message": "user with " + req.body.email + " already exists"
      })
    } else {
    User.create(newUser)
      .then(function(user) {
        const data = {
          link: code[1],
          user: user.username,
          email: user.email
        }
        // send the mail over here
        let subject = "Account confirmation email";
        let text = "Get started with OoOO blogginf platform"
        Email.sendmail(req, res, next, user.email, subject, text, './templates/accountConfirmation', data);
        return res.json(user);
      })
      .catch(function(err) {
        next(new Error(err));
      })
    }
  })
}

exports.put = function(req, res, next) {
  const user = req.Cuser;
  const update = req.body;
  _.merge(user, update);
  user.save(function(err, saved) {
    if(err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
}

exports.delete = function(req, res, next) {
  req.Cuser.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
}

exports.resend = function(req, res, next) {
  const mail = securityHelper.confirmMail(req, res, next)
  // if(mail)
}

exports.sendPasswordReset = function(req, res, next) {
  const data = req.body
  User.findOne({email: data.email}, function(err, userFound) {
    const subject = "Reset your password"
    const text = "CLick on the link below to reset your password"
    const code = securityHelper.passwordReset(req);
    const data = {
      user: userFound.username,
      email: userFound.email,
      link: code[1]
    }
    userFound.password_token = code[0]
    userFound.save(function(err, saved) {
      if (err) {
        return next(err)
      }
      if(saved) {
        Email.sendmail(req, res, next, saved.email, subject, text, './templates/passwordReset', data);
        res.json({
          "success": "success",
          "message": "successfully resended password reset link",
          "user": saved
        })
      }
    })
  })
}

exports.passwordReset = function(req, res, next) {
  const token = req.params.token
  User.findOne({ password_token: token}, function(err, found) {
    if (err) {
      return next(err)
    }
    if(found) {
      res.json(found)
    } else {
      res.json({"message": "No user found"})
    }
  })
}

exports.postResetPassword = function(req, res, next) {
  User.findOne({password_token: req.params.token}, function(err, user) {
    if(err) {
      return next(err)
    }
    if(req.body.password == req.body.password_again) {
      // proceed with password change
      user.password = req.body.password;
      user.password_token = null
      user.save(function(err, saved) {
        if(err) {
          return next(err)
        }
        let subject = "account password changed";
        let text = "Your account password was recently changed."
        const data = {
          user: saved,
          message: 'Your password was recently changed. Please keep your password safe and secure'
        }
        Email.sendmail(req, res, next, saved.email, subject, text, './templates/confirmation', data)
        return res.json(saved)
      })
    } else {
      res.json({
        "success": "failure",
        "message": "password do not matched"
      })
    }
  })
}
