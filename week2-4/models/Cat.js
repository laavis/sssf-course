const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CatSchema = new Schema({
  name: String,
  age: Number,
  gender: { type: String, enum: ['male', 'female'] },
  color: String,
  weight: Number
});

module.exports = Cat = mongoose.model('cat', CatSchema);
