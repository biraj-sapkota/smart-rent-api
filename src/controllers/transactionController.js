const Transaction = require("../models/Transaction");

exports.createTransaction = (req, res) => {
  const transaction = new Transaction(req.body);

  transaction
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((_err) => {
      res.status(500).send("Error adding the transaction.");
    });
};

exports.deleteTransaction = (req, res) => {
  Transaction.deleteOne({ _id: req.params.transactionID }, (err) => {
    if (err) res.status(500).send(err);
    res.send("Transaction Deleted Successfully!!");
  });
};

exports.getTransaction = (_req, res) => {
  Transaction.find({}, (err, data) => {
    if (err) res.status(500).send(err);
    res.json(data);
  });
};

exports.getSingleTransaction = (req, res) => {
  Transaction.findById(req.params.transactionID, (err, data) => {
    if (err) res.status(500).send(err);
    res.json(data);
  });
};
