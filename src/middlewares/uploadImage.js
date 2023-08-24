const multer = require("multer");
const s3 = require("../config/awsconfig");
const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage });
const path = require("path");
const uploadImageToS3 = async (file) => {
  const fileExt = path.extname(file.originalname);
  const fileName = Date.now();
  const params = {
    Bucket: "nodejsassessment",
    Key: String(`${fileName}${fileExt}`),
    Body: file.buffer,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) reject(err);
      resolve(`${data.Location}`); // Image URL
    });
  });
};

module.exports = { upload, uploadImageToS3 };
