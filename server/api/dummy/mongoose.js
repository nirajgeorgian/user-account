"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kittySchema = Schema({
  name: String
})

const Kitten = mongoose.model('kitten', kittySchema);

kittySchema.methods.speak = function() {
  const greet = this.name
  ? "Meow meow by " + this.name
  : "I don't have a name"
  console.log(greet);
}

let silence = new Kitten({
  name: 'dodo'
})

silence.save(function(err, saved) {
  console.log(saved);
})
