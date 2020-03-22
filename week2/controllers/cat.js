'use strict';

const Cat = require('../models/Cat');

const cats = Cat.cats;

const getCatList = (_, res) => {
  res.json(cats);
};

const getCatById = (req, res) => {
  const result = cats.filter(cat => cat.id === req.params.id);
  res.json(result);
};

const addCat = (_, res) => {
  res.json('add cat');
};

const editCat = (req, res) => {
  res.json(`edit cat ${req.params.id}`);
};

const deleteCat = (req, res) => {
  res.json(`delete cat ${req.params.id}`);
};

module.exports = {
  getCatList,
  getCatById,
  addCat,
  editCat,
  deleteCat
};
