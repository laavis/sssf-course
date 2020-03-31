require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/User');

router.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ errors: [{ msg: 'Username already exists' }] });

    user = new User({
      username,
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

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3 days' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

    console.log('user created');
  } catch (err) {
    next.error(err);
  }
});

module.exports = router;
