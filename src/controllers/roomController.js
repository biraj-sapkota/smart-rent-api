const { roomType, Room } = require("../models/Room");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const Cloudinary = require("../Cloudinary");

exports.photosMiddleware = multer({ dest: __dirname + "/uploads" });

exports.createRoom = async (req, res) => {
  try {
    const { token } = req.cookies;
    const userData = jwt.verify(token, process.env.Secret_Key);
    const roomData = req.body;

    const room = new Room({
      title: roomData.title,
      roomImages: roomData.roomImages,
      contract: roomData.contract,
      roomDescription: roomData.roomDescription,
      address: roomData.address,
      numberOfrooms: roomData.numberOfrooms,
      rentAmount: roomData.rentAmount,
      roomType: roomData.roomType,
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

exports.deleteRoom = async (req, res) => {
  const { roomId } = req.query;

  try {
    const room = await Room.findById(roomId).exec();

    if (room && room.tenant) {
      res
        .status(500)
        .json({ error: "Failed to delete - Room has a tenant assigned" });
    } else {
      await Room.deleteOne({ _id: roomId }).exec();
      res.send("Room Deleted Successfully!!");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getRoom = (_req, res) => {
  Room.find({}, (err, data) => {
    if (err) res.status(500).send(err);
    res.json(data);
  });
};

exports.getRoomByUser = (req, res) => {
  const { token } = req.cookies;
  if (!token) throw "User must be logged in";

  jwt.verify(token, process.env.Secret_Key, {}, async (err, userData) => {
    if (err) throw err;
    const { _id } = userData;

    const rooms = await Room.find({ owner: _id });
    const roomTypes = Object.values(roomType);

    res.json({ rooms, roomTypes });
  });
};

exports.getOneRoom = async (req, res) => {
  const { roomID } = req.params;
  res.json(await Room.findById(roomID));
};
