const createError = require("http-errors");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const {
  ERROR_STATUS_CODE,
  ERROR_MESSAGE,
} = require("../../constants/httpManagement");
const { upload } = require("../../util");

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;

const newS3 = new S3Client({
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
  region: region,
});

exports.postImage = async (req, res, next) => {
  const image = req.file;

  try {
    if (!image) {
      return next(
        createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA)
      );
    }

    const result = await upload(image);

    return res.status(201).json({ location: result.Location });
  } catch (error) {
    next(
      createError(
        ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGE.OCCURRED_SERVER_ERROR
      )
    );
  }
};

exports.deleteImage = async (req, res, next) => {
  const url = req.headers.params;

  try {
    if (!url) {
      return next(
        createError(ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.NO_DATA)
      );
    }
    const splitedUrl = url.split(/[""]/);

    for (let i = 0; i < splitedUrl.length; i++) {
      await newS3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: splitedUrl[i],
        })
      );
    }

    return res.status(200).json({ message: "success" });
  } catch (error) {
    next(
      createError(
        ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGE.OCCURRED_SERVER_ERROR
      )
    );
  }
};
