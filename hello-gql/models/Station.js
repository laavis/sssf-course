const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Station = new Schema({
  Title: String,
  Town: String,
  AddressLine1: String,
  StateOrProvince: String,
  Postcode: String,
  Location: {
    type: {
      index: { type: '2dsphere', sparce: false },
      type: String,
      enum: ['Point']
    },
    coordinates: [Number]
  },
  Connections: [
    {
      type: Schema.Types.ObjectId,
      ref: 'connection'
    }
  ]
});

Station.static('getStation', function(id, params) {
  const query = id ? this.findById(id) : this.find(params || {});
  return query.populate({
    path: 'Connections',
    populate: [
      {
        path: 'ConnectionTypeID',
        select: 'FormalName Title'
      },
      {
        path: 'CurrentTypeID',
        select: 'Title Description'
      },
      {
        path: 'LevelID',
        select: 'Title Comments IsFastChargeCapable'
      }
    ]
  });
});

module.exports = mongoose.model('station', Station);
