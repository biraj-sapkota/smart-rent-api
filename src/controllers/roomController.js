const Room = require("../models/Room");

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

exports.uploadPhotoByLink = (req, res) => {
  const {link} = req.body
  
}

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
