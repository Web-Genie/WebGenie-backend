const express = require("express");
const imageRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  postImage,
  deleteImage,
} = require("../routes/controllers/image.controller");

imageRouter.post("/", upload.single("imageFile"), postImage);
imageRouter.delete("/delete", deleteImage);

module.exports = imageRouter;
