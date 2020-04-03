const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Animal = new Schema({
  name: String,
  species: {
    type: Schema.Types.ObjectId,
    ref: 'species'
  }
});

module.exports = mongoose.model('animal', Animal);
