const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConnectionType = new Schema({
  Title: String,
  FormalName: String
});

module.exports = mongoose.model('connectiontype', ConnectionType);
