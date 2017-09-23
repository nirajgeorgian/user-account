"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    tags: [{type: String, lowercase: true}],
    postDate: {type: String, default: Date.now},
})

module.exports = mongoose.model('tags',tagSchema);
