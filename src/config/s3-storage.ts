import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "eu-central-1",
});
const s3 = new AWS.S3({});

const getUploadUrl = (key: String, extension: String) => {
  const timeStamp = Date.now();
  const params = {
    Bucket: "test-bucket",
    Key: `${key}/${timeStamp}.${extension}`,
    Expires: 60 * 60, // 3600 seconds,
  };

  try {
    const url = s3.getSignedUrl("putObject", params);
    console.log("url - ", url);
    return { url: url, key: params.Key };
  } catch (e) {
    console.log("Err = ", e);
    return e;
  }
};

const Storage = {
  getUploadUrl,
};

export default Storage;
