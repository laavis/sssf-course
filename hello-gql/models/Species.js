const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Species = new Schema({
  name: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  }
});

module.exports = mongoose.model('species', Species);
