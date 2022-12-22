const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../model/users");

module.exports = (app) => {
  //initialization
  app.use(passport.initialize());
  app.use(passport.session());

  //register strategy
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      function verify(req, email, password, done) {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(
                null,
                false,
                req.flash("warning_msg", "Email is not registered.")
              );
            }
            if (user.password !== password) {
              return done(
                null,
                false,
                req.flash("warning_msg", "Email or Password is not correct.")
              );
            }
            return done(null, user);
          })
          .catch((err) => done(err, null));
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};
