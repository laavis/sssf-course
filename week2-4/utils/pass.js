'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/User');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new Strategy((email, password, done) => {
    const user = userModel.getUserLogin(email);
    if (!user || user.password !== password) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret'
    },
    (jwtPayload, done) => {
      console.log(jwtPayload);

      const user = userModel.getUser(jwtPayload.id);
      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }
  )
);

module.exports = passport;
