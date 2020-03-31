const Station = require('../models/Station');
require('../models/Connection');
require('../models/ConnectionType');
require('../models/CurrentType');
require('../models/Level');

const getStationList = async (req, res) => {
  const { topRight, bottomLeft } = req.query;
  const start = parseInt(req.query.start) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const params = {};
  if (topRight && bottomLeft) {
    try {
      const tr = JSON.parse(topRight);
      const bl = JSON.parse(bottomLeft);
      const poly = {
        type: 'Polygon',
        coordinates: [
          [
            [bl.long, tr.lat],
            [bl.long, bl.lat],
            [tr.long, bl.lat],
            [tr.long, tr.lat],
            [bl.long, tr.lat]
          ]
        ]
      };
      params.Location = {
        $geoWithin: {
          $geometry: poly
        }
      };
    } catch (e) {
      console.error(e);
      return res.status(400).send(e.toString());
    }
  }
  res.send(
    await Station.getStation(null, params)
      .skip(start)
      .limit(limit)
  );
};

const getNearStationList = async (req, res) => {
  const { point } = req.query;
  const params = {};
  if (point) {
    try {
      const p = JSON.parse(point);
      const geoPoint = {
        type: 'Point',
        coordinates: [p.long, p.lat]
      };
      params.Location = {
        $nearSphere: {
          $geometry: geoPoint,
          $maxDistance: 500
        }
      };
    } catch (e) {
      console.error(e);
      return res.status(400).send(e.toString());
    }
  }
  res.send(await Station.getStation(null, params).limit(10));
};

const getStation = async (req, res) => {
  const id = req.params.id;
  Station.getStation(id).exec((err, stations) => {
    if (!err) {
      res.send(stations);
    } else {
      res.status(400).send(err);
    }
  });
};

const addStation = async (req, res) => {
  try {
    const station = await Station.create({
      Title: req.body.title,
      Town: req.body.town,
      AddressLine1: req.body.address,
      StateOrProvince: req.body.state,
      Postcode: req.body.zip,
      Location: {
        type: 'Point',
        coordinates: req.body.coord
      },
      Connections: req.body.connections
    });
    res.send(`Station added with id: ${station.id}`);
  } catch (e) {
    res.status(400).send(e.toString());
  }
};

const modifyStation = async (req, res) => {
  const reqStation = {
    Title: req.body.title,
    Town: req.body.town,
    AddressLine1: req.body.address,
    StateOrProvince: req.body.state,
    Postcode: req.body.zip,
    Location: {
      type: 'Point',
      coordinates: req.body.coord
    },
    Connections: req.body.connections
  };
  const station = await Station.findByIdAndUpdate(req.body.id, reqStation).exec();
  if (station) {
    res.send(`${station.id} updated!`);
  } else {
    res.status(400).send(`${req.body.id} not found`);
  }
};

const deleteStation = async (req, res) => {
  const deleted = await Station.findByIdAndDelete(req.body.id).exec();
  if (deleted) {
    res.send(`${deleted.id} deleted`);
  } else {
    res.status(400).send(`${req.body.id} not found`);
  }
};

module.exports = {
  getStationList,
  getNearStationList,
  getStation,
  addStation,
  deleteStation,
  modifyStation
};
