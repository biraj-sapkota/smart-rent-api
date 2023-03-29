var multer = require('multer');
var cloudinary = require('cloudinary').v2;

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const CloudinaryUpload = async (image) => {
  return cloudinary.uploader.upload(image);
};

var MulterUpload = multer({ storage: storage });

module.exports = { MulterUpload, CloudinaryUpload };
