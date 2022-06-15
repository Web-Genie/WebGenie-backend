const createError = require("http-errors");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const {
  ERROR_STATUS_CODE,
  ERROR_MESSAGE,
  HTTP_STATUS_CODE,
  HTTP_STATUS_MESSAGE,
} = require("../../constants/httpManagement");
const { upload } = require("../../util");

const region = process.env.AWS_REGION;

const newS3 = new S3Client({
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

    res
      .status(HTTP_STATUS_CODE.CREATE_SUCCESS)
      .json({ location: result.Location });
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

    res
      .status(HTTP_STATUS_CODE.REQUEST_SUCCESS)
      .json({ message: HTTP_STATUS_MESSAGE.SUCCESS_REQUEST });
  } catch (error) {
    next(
      createError(
        ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGE.OCCURRED_SERVER_ERROR
      )
    );
  }
};
