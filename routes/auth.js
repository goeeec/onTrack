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
    console.log(req.session);
    res.redirect("/");
  }
);

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

router.get("/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
