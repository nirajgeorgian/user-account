"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  date_of_joining: { type: Date, default: Date.now },
  connections: [ {type: Schema.Types.ObjectId, ref: 'user'} ],
  date_of_birth: Date
});

module.exports = mongoose.model('user', UserSchema);
