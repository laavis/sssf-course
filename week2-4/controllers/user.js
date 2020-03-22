'use strict';

const User = require('../models/User');
const users = User.users;

const getUserList = (_, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  const user = users.find(user => user.id === req.params.id);
  const { id, name, email } = user;

  res.json({ id, name, email });
};

const addUser = (req, res) => {
  console.log(req.body);
  const { name, email, passwd } = req.body;
  res.json({ name, email, passwd });
};

module.exports = {
  getUserList,
  getUserById,
  addUser
};
