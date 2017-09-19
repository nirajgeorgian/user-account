"use strict";
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  firstname: {type: String, lowercase: true},
  lastname: {type: String, lowercase: true},
  email: {type: String, lowercase: true},
  password: {type: String, required: true},
  profile_picture: String,
  date_of_joining: { type: Date, default: Date.now },
  connections: [ {type: Schema.Types.ObjectId, ref: 'user'} ],
  date_of_birth: Date
}, { runSettersOnQuery: true });

// use pre hooks to use bcrypt
UserSchema.pre('save', function(next) {
  // this here refers to user
  let user = this;
  // check to see if user password is modified
  if(!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
})
// add the methods here authenticate and encryptPassword
UserSchema.methods = {
  // authenticate
  authenticate: function(plainPassword) {
    bcrypt.compare(plainPassword, 10, function(err, res) {
      if (err) {
        return err;
      }
    })
    return true;
  },
  // encryptPassword
  encryptPassword: function() {
    next();
  }
}
module.exports = mongoose.model('user', UserSchema);
