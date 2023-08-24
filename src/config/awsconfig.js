// awsConfig.js
const AWS = require("aws-sdk");
const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = require("./index");
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: "eu-west-1",
});

const s3 = new AWS.S3();

module.exports = s3;
