const passport = require("passport");
const GitHubStrategy = require('passport-github').Strategy;
const keys = require('../config/keys');

const User = require("../models").User;


passport.use(
  new GitHubStrategy({
    clientID: keys.githubClientID,
    clientSecret: keys.githubClientSecret,
    callbackURL: '/auth/github/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    const { id, name, email } = profile._json;
    const tempUser = { id, name, email };
    // console.log(tempUser);
    return done(null, tempUser);
  })
)

passport.serializeUser((user, done) => {
  // push to session
  done(null, user);
});

passport.deserializeUser((id, done) => {
  // TODO: findByPk syntax? findById deprecated? Try later after sucessfully record data in DB
  // User.findById(id).then(user => {
  //   if (!user) {
  //     return done(null, false);
  //   }

    return done(null, id);
  // });
});

passport.redirectIfLoggedIn = route => (req, res, next) =>
  req.user ? res.redirect(route) : next();

passport.redirectIfNotLoggedIn = route => (req, res, next) =>
  req.user ? next() : res.redirect(route);

module.exports = passport;
