const { upload } = require("../controllers/aws.controller");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;

const newS3 = new S3Client({
  region: region,
});

exports.postImage = async (req, res, next) => {
  try {
    const image = req.file;
    const result = await upload(image);

    res.status(201).json({ location: result.Location });
  } catch (error) {
    next(error);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const url = req.headers.params;
    const splitedUrl = url.split(/[""]/);

    for (let i = 0; i < splitedUrl.length; i++) {
      await newS3.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: splitedUrl[i],
        })
      );
    }

    return res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};
