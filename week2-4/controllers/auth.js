'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');

const auth = (req, res, next) => {
  console.log('aa');

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

const testLogin = async (req, res, next) => {
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

const login = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, _) => {
    console.log(user);

    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, 'your_jwt_secret');
      return res.json({ user, token });
    });
  })(req, res);
};

module.exports = {
  auth,
  testLogin,
  login
};
