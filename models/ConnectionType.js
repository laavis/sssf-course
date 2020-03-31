const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConnectionType = new Schema({
  FormalName: String,
  Title: String
});

module.exports = mongoose.model('connectiontype', ConnectionType);
