'use strict';
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = require('graphql');

const Animal = require('../models/Animal');
const Species = require('../models/Species');
const Category = require('../models/Category');

const auth = require('../middleware/auth');

const animalData = [{ id: '1', animalName: 'Frank', species: '1' }];
const speciesData = [{ id: '1', speciesName: 'Cat', category: '1' }];
const categoryData = [{ id: '1', categoryName: 'Mammal' }];

const AnimalType = new GraphQLObjectType({
  name: 'animal',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    species: {
      type: SpeciesType,
      async resolve(parent, args) {
        try {
          return await Species.findById(parent.species);
        } catch (e) {
          return new Error(e.message);
        }
      }
    }
  })
});

const SpeciesType = new GraphQLObjectType({
  name: 'species',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: {
      type: CategoryType,
      async resolve(parent, args) {
        try {
          return await Category.findById(parent.category);
        } catch (e) {
          return new Error(e.message);
        }
      }
    }
  })
});

const CategoryType = new GraphQLObjectType({
  name: 'category',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    animals: {
      type: new GraphQLList(AnimalType),
      async resolve(parent, args, { req, res }) {
        try {
          auth(req, res);
          return animalData;
        } catch (err) {
          console.error(err);
          res.status(400).json(err);
        }
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'MutationType',
  fields: {
    addCategory: {
      type: CategoryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args, { req, res, auth }) {
        try {
          auth(req, res);
          return await Category.create(args);
        } catch (err) {
          return new Error(err.message);
        }
      }
    },
    addSpecies: {
      type: SpeciesType,
      args: {
        category: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args, { req, res, auth }) {
        try {
          auth(req, res);
          return Species.create(args);
        } catch (e) {
          return new Error(e.message);
        }
      }
    },
    addAnimal: {
      type: AnimalType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        species: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args, { req, res }) {
        try {
          auth(req, res);
          return Animal.create(args);
        } catch (e) {
          return new Error(e.message);
        }
      }
    },
    modifyAnimal: {
      type: AnimalType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        species: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args, { req, res, auth }) {
        try {
          auth(req, res);
          return await animal.findByIdAndUpdate(args.id, args, { new: true });
        } catch (err) {
          return new Error(err.message);
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
