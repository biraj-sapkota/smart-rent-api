const Bill = require("../models/Bill");

exports.createBill = (req, res) => {
  const bill = new Bill(req.body);

  bill
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((_err) => {
      res.status(500).send("Error adding the bill.");
    });
};

exports.updateBill = (req, res) => {
  Bill.findOneAndUpdate(
    { _id: req.params.billID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, data) => {
      if (err) res.status(500).send(err);
      res.json(data);
    }
  );
};

exports.deleteBill = (req, res) => {
  Bill.deleteOne({ _id: req.params.billID }, (err) => {
    if (err) res.status(500).send(err);
    res.send("Bill Deleted Successfully!!");
  });
};

exports.getBill = (_req, res) => {
  Bill.find({}, (err, data) => {
    if (err) res.status(500).send(err);
    res.json(data);
  });
};

exports.getSingleBill = (req, res) => {
  Bill.findById(req.params.billID, (err, data) => {
    if (err) res.status(500).send(err);
    res.json(data);
  });
};
