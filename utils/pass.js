const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('../models/User');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// local strategy for username password login
passport.use(
  new Strategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return done(null, false);
    } else {
      return done(null, { username: user.username, id: user._id });
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    (jwtPayload, done) => {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return done(null, jwtPayload || false);
    }
  )
);

module.exports = passport;
