const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Connection = new Schema({
  ConnectionTypeID: {
    type: Schema.Types.ObjectId,
    ref: 'connectiontype'
  },
  CurrentTypeID: {
    type: Schema.Types.ObjectId,
    ref: 'currenttype'
  },
  LevelID: {
    type: Schema.Types.ObjectId,
    ref: 'level'
  },
  Quantity: Number
});

module.exports = mongoose.model('connection', Connection);
