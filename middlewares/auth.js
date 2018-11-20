const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const keys = require('../config/keys');

const User = require("../models").User;
const LocalAuth = require("../models").LocalAuth;
const GithubAuth = require("../models").GithubAuth;

function passwordsMatch(passwordSubmitted, storedPassword) {
  return bcrypt.compareSync(passwordSubmitted, storedPassword);
}

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    (email, password, done) => {
      LocalAuth.findOne({
        where: { email }
      }).then(user => {
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        if (passwordsMatch(password, user.password_hash) === false) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user, { message: "Successfully Logged In!" });
      });
    }
  )
);

passport.use(
  new GitHubStrategy({
    clientID: keys.githubClientID,
    clientSecret: keys.githubClientSecret,
    callbackURL: '/auth/github/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    const { id, displayName } = profile;
    const email = profile.emails[0].value;

    const existingGithubUser = await GithubAuth.findOne({ where: { githubId: id } });
    if (existingGithubUser) {
      return done(null, existingGithubUser);
    }

    const newUser = await User.create({ username: profile.username });
    const newGithubUser = await GithubAuth.create({
      githubId: id,
      name: displayName,
      email: email,
      userId: newUser.id
    });

    return done(null, newGithubUser);
  })
)

passport.serializeUser((user, done) => {
  // push to session
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  });
});

passport.redirectIfLoggedIn = route => (req, res, next) =>
  req.user ? res.redirect(route) : next();

passport.redirectIfNotLoggedIn = route => (req, res, next) =>
  req.user ? next() : res.redirect(route);

module.exports = passport;
