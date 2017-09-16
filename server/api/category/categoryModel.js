"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryModel = new Schema({
  category: { type: String, required: true, unique: True},
  category_created_on: { type: String, default: Date.now },
  category_updated_on: String
});

module.exports = mongoose.model('category', CategoryModel);
