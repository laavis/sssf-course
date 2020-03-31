const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Level = new Schema({
  Title: String,
  Comments: String,
  IsFastChargeCapable: Boolean
});

module.exports = mongoose.model('level', Level);
