'use strict';

const Cat = require('../models/Cat');

const getCatList = async (req, res) => {
  try {
    const cats = await Cat.find(req.query);

    if (cats.length === 0) return res.json('No cats found :(');

    res.json(cats);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// @TODO: refactor
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
