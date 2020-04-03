require('dotenv').config();
const jwt = require('jsonwebtoken');

// Check for user authentication
module.exports = function(req, res) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
