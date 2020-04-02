'use strict';
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const animalData = [{ id: '1', animalName: 'Frank', species: '1' }];

const speciesData = [{ id: '1', speciesName: 'Cat', category: '1' }];

const categoryData = [{ id: '1', categoryName: 'Mammal' }];

const AnimalType = new GraphQLObjectType({
  name: 'animal',
  description: 'Animal name and species',
  fields: () => ({
    id: { type: GraphQLID },
    animalName: { type: GraphQLString },
    species: {
      type: SpeciesType,
      resolve(parent, args) {
        return _.find(speciesData, { id: parent.id });
      }
    }
  })
});

const SpeciesType = new GraphQLObjectType({
  name: 'species',
  fields: () => ({
    id: { type: GraphQLID },
    speciesName: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve(parent, args) {
        return _.find(categoryData, { id: parent.category });
      }
    }
  })
});

const CategoryType = new GraphQLObjectType({
  name: 'category',
  fields: () => ({
    id: { type: GraphQLID },
    categoryName: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    animals: {
      type: new GraphQLList(AnimalType),
      description: 'Get all animals',
      resolve(parent, args) {
        return animalData;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
