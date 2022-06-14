require("dotenv").config();
require("./config/db")();
require("./config/firebaseAdmin");

const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(
  cors({
    origin: "*",
    credential: "true",
  })
);

const loginRouter = require("./routes/login");
const websitesRouter = require("./routes/websites");
const imageRouter = require("./routes/image");

app.use("/", loginRouter);
app.use("/websites", websitesRouter);
app.use("/image", imageRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  console.error({
    "error status :": err.stauts,
    "error message :": err.message,
    "error stack :": err.stack,
  });
});

module.exports = app;
