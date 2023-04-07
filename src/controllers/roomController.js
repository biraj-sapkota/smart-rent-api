const Room = require("../models/Room");
const imageDownloader = require("image-downloader");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const Cloudinary = require("../Cloudinary");

exports.photosMiddleware = multer({ dest: __dirname + "/uploads" });

exports.createRoom = async (req, res) => {
  try {
    const { token } = req.cookies;
    const userData = jwt.verify(token, process.env.Secret_Key);
    const photos = req.body.photos;

    const urls = photos.map((photo) => photo.url);
    const room = new Room({
      title: req.body.title,
      roomImages: urls,
      roomDescription: req.body.description,
      address: req.body.address,
      numberOfrooms: req.body.numberOfRooms,
      rentAmount: req.body.rentAmount,
      roomType: req.body.roomType,
      owner: userData._id,
    });

    const savedRoom = await room.save();
    res.status(200).json(savedRoom);
  } catch (err) {
    res.status(500).json({ error: "Error adding the room." });
  }
};

exports.uploadPhotoByLink = async (req, res) => {
  const { link } = req.body;

  try {
    const result = await Cloudinary.CloudinaryUpload(link);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload photo" });
  }
};

exports.uploadPhoto = async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const file = req.files[i];
    const newPath = file.path + "." + file.originalname.split(".").pop();
    fs.renameSync(file.path, newPath);
    const uploadedFile = await Cloudinary.CloudinaryUpload(newPath);
    uploadedFiles.push(uploadedFile);
  }
  res.json(uploadedFiles);
};

exports.updateRoom = (req, res) => {
  Room.findOneAndUpdate(
    { _id: req.params.roomID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, data) => {
      if (err) res.status(500).send(err);
      res.json(data);
    }
  );
};

exports.deleteRoom = (req, res) => {
  const { roomId } = req.query;
  Room.deleteOne({ _id: roomId }, (err) => {
    if (err) res.status(500).send(err);
    res.send("Room Deleted Successfully!!");
  });
};

exports.getRoom = (_req, res) => {
  Room.find({}, (err, data) => {
    if (err) res.status(500).send(err);
    res.json(data);
  });
};

exports.getRoomByUser = (req, res) => {
  const { token } = req.cookies;
  if (!token) throw "User Must be logged in";
  jwt.verify(token, process.env.Secret_Key, {}, async (err, userData) => {
    if (err) throw err;
    const { _id } = userData;
    res.json(await Room.find({ owner: _id }));
  });
};

exports.getOneRoom = async (req, res) => {
  const { roomID } = req.params;
  res.json(await Room.findById(roomID));
};
