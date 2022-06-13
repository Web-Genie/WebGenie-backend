const { upload } = require("../controllers/awsController");

exports.postImage = async (req, res, next) => {
  try {
    const image = req.file;
    const result = await upload(image);

    res.status(201).json({ location: result.Location });
  } catch (error) {
    next(error);
  }
};
