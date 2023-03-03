const Room = require("../models/Room");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

exports.photosMiddleware = multer({ dest: __dirname + "/uploads" });

exports.createRoom = (req, res) => {
  const room = new Room(req.body);

  room
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((_err) => {
      res.status(500).send("Error adding the room.");
    });
};

exports.uploadPhotoByLink = async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
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

exports.getOneRoom = (req, res) => {
  Room.findById(req.params.roomID, (err, data) => {
    if (err) res.status(500).send(err);
    res.json(data);
  });
};
