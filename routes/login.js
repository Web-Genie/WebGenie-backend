const express = require("express");
const loginRouter = express.Router();
const { decodeToken } = require("../routes/middleware/authentication");
const { postUser } = require("./controllers/login.controller");

loginRouter.post("/", decodeToken, postUser);

module.exports = loginRouter;
