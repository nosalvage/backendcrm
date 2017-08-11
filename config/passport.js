const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/userModel");
const config = require("../config/config");

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({ id: jwt_payload.id }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
};