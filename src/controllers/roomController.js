const Room = require("../models/Room");
const imageDownloader = require("image-downloader");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");

exports.photosMiddleware = multer({ dest: __dirname + "/uploads" });

exports.createRoom = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.Secret_Key, {}, async (err, userData) => {
    if (err) throw err;
    const room = new Room({
      title: req.body.title,
      roomImages: req.body.photos,
      roomDescription: req.body.description,
      address: req.body.address,
      numberOfrooms: req.body.numberOfRooms,
      rentAmount: req.body.rentAmount,
      roomType: req.body.roomType,
      owner: userData._id,
    });
    await room
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((_err) => {
        res.status(500).send("Error adding the room.");
      });
  });
};

exports.uploadPhotoByLink = async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  try {
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    res.json(newName);
  } catch (error) {
    res.status(500);
  }
};

exports.uploadPhoto = async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace(__dirname + "/uploads", ""));
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
  Room.deleteOne({ _id: req.params.roomID }, (err) => {
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
  jwt.verify(token, process.env.Secret_Key, {}, async (err, userData) => {
    if (err) throw err;
    const { _id } = userData;
    res.json(await Room.find({ owner: _id }));
  });
};

exports.getOneRoom = async(req, res) => {
  const {roomID} = req.params;
  res.json(await Room.findById(roomID));
};
