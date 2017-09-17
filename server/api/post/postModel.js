"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, unique: true, required: true },
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'user' },
  category: [ {type: Schema.Types.ObjectId, ref: 'category'} ],
  post_created_on: { type: Date, default: Date.now },
  post_updated_on: Date,
  draft: { type: Boolean, default: false }
});

module.exports = mongoose.model('post', PostSchema);
