const express = require("express");
const websiteRouter = express.Router();
const { decodeToken } = require("../routes/middleware/authentication");
const {
  getEachWebsite,
  saveWebsite,
  deleteWebsite,
  postWebsite,
  deployWebsite,
  getDeployedWebsite,
} = require("./controllers/websites.controller");

websiteRouter.post("/", decodeToken, postWebsite);
websiteRouter.get("/:website_id", decodeToken, getEachWebsite);
websiteRouter.post("/:website_id", decodeToken, saveWebsite);
websiteRouter.delete("/:website_id", decodeToken, deleteWebsite);
websiteRouter.get("/:website_id/deploy", getDeployedWebsite);
websiteRouter.patch("/:website_id/deploy", decodeToken, deployWebsite);

module.exports = websiteRouter;
