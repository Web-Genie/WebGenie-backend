const express = require("express");
const imageRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { postImage } = require("../routes/controllers/image.controller");

imageRouter.post("/", upload.single("imageFile"), postImage);

module.exports = imageRouter;
