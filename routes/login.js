const express = require("express");
const loginRouter = express.Router();
const { decodeToken } = require("../routes/middleware/authentication");
const { getUser } = require("./controllers/login.controller");

loginRouter.get("/", decodeToken, getUser);

module.exports = loginRouter;
