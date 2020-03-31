'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const login = async (req, res, next) => {
  console.log('using this');

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2 days' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  auth,
  login
};
