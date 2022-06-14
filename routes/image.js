const express = require("express");
const imageRouter = express.Router();
const multer = require("multer");
const {
  postImage,
  deleteImage,
} = require("../routes/controllers/image.controller");

const upload = multer({ dest: "uploads/" });

imageRouter.post("/", upload.single("imageFile"), postImage);
imageRouter.delete("/:image_key", deleteImage);

module.exports = imageRouter;
