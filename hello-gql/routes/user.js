require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ctrl = require('../controllers/user');
const auth = require('../middleware/auth');

const User = require('../models/User');
const router = express.Router();

// test auth
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/register', ctrl.registerUser);

module.exports = router;
