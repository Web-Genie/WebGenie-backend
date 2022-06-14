const fs = require("fs");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const newS3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

exports.postImage = async (req, res, next) => {
  try {
    const image = req.file;

    const params = {
      Bucket: process.env.AWS_ACCESS_KEY_ID,
      Body: fs.createReadStream(image.path),
      Key: image.filename,
    };

    await newS3.send(new PutObjectCommand(params));

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
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: splitedUrl[i],
        })
      );
    }

    return res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};
