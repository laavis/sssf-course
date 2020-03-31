const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrentType = new Schema({
  Title: String,
  Description: String
});

module.exports = mongoose.model('currenttype', CurrentType);
