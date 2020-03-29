'use strict';
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const getUserList = (_, res) => {
  res.json(users);
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id }).populate('user', ['name']);

    const { username, _id } = user;

    if (!user) return res.status(400).json({ msg: 'User not found :(' });
    res.json({ username, _id });
  } catch (err) {
    console.error(err);
  }
};

const getUserLogin = email => {
  const user = users.find(user => {
    if (user.email === email) {
      return user;
    }
  });
  console.log(user);

  return user;
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ errors: [{ msg: 'Email already exists' }] });

    user = new User({
      username,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2 days' }, (err, token) => {
      if (err) throw err;
      res.json({
        user,
        token
      });
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getUserList,
  getUserById,
  getUserLogin,
  createUser
};
