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

const addCat = async (req, res) => {
  try {
    const newCat = new Cat({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      color: req.body.color,
      weight: req.body.weight
    });

    const cat = await newCat.save();
    res.json(cat);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
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
