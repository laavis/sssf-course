const MConnection = require('../models/Connection');
const MConnectionType = require('../models/ConnectionType');
const MCurrentType = require('../models/CurrentType');
const MLevel = require('../models/Level');
const MStation = require('../models/Station');

const stationCtrl = require('../controllers/station');

const {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require('graphql');

const ConnectionType = new GraphQLInputObjectType({
  name: 'connection',
  fields: () => ({
    _id: { type: GraphQLString },
    fields: () => ({
      type: ConnectionTypeType,
      resolve: parent => {
        return MConnectionType.findById(parent.ConnectionTypeID);
      },
      CurrentType: {
        type: currentTypeType,
        resolve: parent => {
          return MCurrentType.findById(parent.CurrentTypeID);
        }
      },
      LevelType: {
        type: levelType,
        resolve: parent => {
          return MLevel.findById(parent.LevelID);
        }
      },
      Quantity: { type: GraphQLInt }
    })
  })
});

const ConnectionTypeType = new GraphQLInputObjectType({
  name: 'connectionType',
  fields: () => ({
    _id: { type: GraphQLString },
    Title: { type: GraphQLString },
    FormalName: { type: GraphQLString }
  })
});

const CurrentTypeType = new GraphQLInputObjectType({
  name: 'currentType',
  fields: () => ({
    _id: { type: GraphQLString },
    Title: { type: GraphQLString },
    Description: { type: GraphQLString }
  })
});

const LevelType = new GraphQLInputObjectType({
  name: 'level',
  fields: () => ({
    _id: { type: GraphQLString },
    Title: { type: GraphQLString },
    Comments: { type: GraphQLString },
    IsFastChargeCapable: { type: GraphQLBoolean }
  })
});

const StationType = new GraphQLObjectType({
  name: 'station',
  fields: () => ({
    _id: { type: GraphQLString },
    Title: { type: GraphQLString },
    Town: { type: GraphQLString },
    AddressLine1: { type: GraphQLString },
    StateOrProvince: { type: GraphQLString },
    Postcode: { type: GraphQLString },
    Location: { type: LocationType },
    Connections: {
      type: new GraphQLList(ConnectionType),
      resolve: parent => {
        return MConnection.find({ _id: { $in: parent.Connections } });
      }
    }
  })
});

const LocationType = new GraphQLObjectType({
  name: 'location',
  fields: () => ({
    type: { type: GraphQLString },
    coordinates: { type: new GraphQLList(GraphQLFloat) }
  })
});

const PointType = new GraphQLInputObjectType({
  name: 'point',
  fields: () => ({
    lng: { type: GraphQLFloat },
    lat: { type: GraphQLFloat }
  })
});

const LocationInputType = new GraphQLInputObjectType({
  name: 'locationInput',
  fields: () => ({
    type: { type: GraphQLString },
    coordinates: { type: new GraphQLList(GraphQLFloat) }
  })
});

const ConnectionInputType = new GraphQLInputObjectType({
  name: 'connectionInput',
  fields: () => ({
    ConnectionTypeID: { type: GraphQLString },
    LevelID: { type: GraphQLString },
    CurrentTypeID: { type: GraphQLString },
    Quantity: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields: {
    stationByID: {
      type: new GraphQLList(StationType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return stationCtrl.getStationById({ id: args.id });
      }
    },
    stations: {
      type: new GraphQLList(StationType),
      description: 'Get all stations',
      args: {
        limit: { type: GraphQLInt },
        start: { type: GraphQLInt },
        topRight: { type: PointType },
        bottomLeft: { type: PointType }
      },
      resolve(parent, args) {
        return stationController.getListOfStations({
          start: args.start,
          limit: args.limit,
          topRight: args.topRight,
          bottomLeft: args.bottomLeft
        });
      }
    },
    currentTypes: {
      type: new GraphQLList(CurrentTypeType),
      resolve(parent, args) {
        return CurrentType.find();
      }
    },
    connectionTypes: {
      type: new GraphQLList(ConnectionType),
      resolve(parent, args) {
        return ConnectionType.find();
      }
    },
    levelTypes: {
      type: new GraphQLList(LevelType),
      resolve(parent, args) {
        return Level.find();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
