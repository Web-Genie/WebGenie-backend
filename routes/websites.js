const express = require("express");
const websiteRouter = express.Router();
const { decodeToken } = require("../routes/middleware/authentication");
const {
  getEachWebsite,
  updateWebsite,
  deleteWebsite,
  postWebsite,
} = require("./controllers/websites.controller");

websiteRouter.post("/", decodeToken, postWebsite);
websiteRouter.get("/:website_id", decodeToken, getEachWebsite);
websiteRouter.patch("/:website_id", decodeToken, updateWebsite);
websiteRouter.delete("/:website_id", decodeToken, deleteWebsite);
websiteRouter.post("/:website_id/deploy");

module.exports = websiteRouter;
