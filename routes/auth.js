const express = require("express");
const router = express.Router();
const models = require("../models");
const User = models.User;
const passport = require("../middlewares/auth");

router.get("/error", (req, res) => {
  res.sendStatus(401);
});

router.post(
  "/signin",
  passport.authenticate("local", { failureRedirect: "/auth/error" }),
  (req, res) => {
    console.log(req.session);
    res.json({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email
    });
  }
);

router.post("/signup", (req, res) => {
  console.log(req.body);
  User.create({
    username: req.body.username,
    email: req.body.email,
    password_hash: req.body.password
  })
    .then(user => {
      res.json({ msg: "user created" });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ msg: "error creating user" });
    });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback", 
  passport.authenticate(
    "github",
    { failureRedirect: "/auth/error" }
  ), (req, res) => {
    res.redirect("/dashboard");
  }
);

module.exports = router;
