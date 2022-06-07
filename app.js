require("dotenv").config();
require("./config/db")();
require("./config/firebaseAdmin");

const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const loginRouter = require("./routes/login");
const websitesRouter = require("./routes/websites");

app.use("/api/login", loginRouter);
app.use("/api/websites", websitesRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  console.error(err);
});

module.exports = app;
