const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passport = require("./middlewares/auth");
const PORT = process.env.PORT || 5000;

app.use(cookieParser());

app.use(
  expressSession({
    secret: "secret-unique-code",
    cookie: { maxAge: 3600000 },
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router config
app.use(require("./routes"));

// models && database config
const models = require("./models/");

models.sequelize.sync().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
  });
});
