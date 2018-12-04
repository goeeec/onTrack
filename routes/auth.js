const express = require("express");
const router = express.Router();
const passport = require("../middlewares/auth");
const User = require("../models").User;

router.get("/error", (req, res) => {
  res.sendStatus(401);
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  console.log(req.session);
  res.redirect("/");
});

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["read:user", "public_repo", "repo:invite"]
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/error" }),
  (req, res) => {
    console.log('in callback!!!!')
    console.log(req.session.passport.user);
    User.findOne({ where: {githubId: req.session.passport.user.id}})
      .then(user => {
        if(user) {
          res.redirect("/");
        } 
        res.redirect("/Signin");
      })
  });

router.get("/user_detail", (req, res) => {
  console.log("IM IN USER DETAUL");
  console.log(req.session);
  res.send(req.session);
});

router.post("/user_detail", async (req, res) => {
  const existingUser = await User.findOne({ where: { githubId: id } });
  if (existingUser) {
    return done(null, existingUser);
  }
  await User.create({ githubId: id });
});

router.post("/post_user_info", async (req, res) => {
  User.findOne({ where: { githubId: req.body.id } })
  .then(user = (id) => {
    if(id) {
      User.update({
                name: req.body.name,
                email: req.body.email, 
                }, { where: { githubId: req.body.id }
              });
    }
    else {
      User.create({
        name: req.body.name,
        email: req.body.email,
        githubId: req.body.id
        });
    }
    res.json({ msg: "user updated" });
  }).catch(() => {
    res.status(400).json({ msg: "error creating user" });
  })
});

router.get("/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
