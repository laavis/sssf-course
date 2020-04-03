const Station = require('../models/Station');
const Connection = require('../models/Connection');

const getStationById = ({ id }) => {
  return Station.findOne({ id });
};

const getAllStations = ({ start, limit, tr, lf }) => {
  const filters = {};
};

module.exports = {
  getStationById,
  getAllStations
};
