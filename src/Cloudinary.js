var cloudinary = require("cloudinary").v2;

const CloudinaryUpload = async (filePath) => {
  return cloudinary.uploader.upload(filePath);
};

module.exports = { CloudinaryUpload };
