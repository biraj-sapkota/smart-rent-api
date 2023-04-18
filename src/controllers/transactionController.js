const Bill = require("../models/Bill");
const Transaction = require("../models/Transaction");
const { verifyPayment } = require("./khaltiController");

exports.createTransaction = async (req, res) => {
  const { billId, payload } = req.body;
  try {
    const bill = await Bill.findById(billId);
    const { billAmount, room, receiver, generator } = bill;
    const paymentStatus = await verifyPayment(billAmount, payload);

    if (paymentStatus) {
      const transaction = new Transaction({
        transactionAmount: billAmount,
        payor: receiver,
        room: room,
        receiver: generator,
        bill: billId,
        khalti_id: paymentStatus,
      });
      await transaction.save();

      bill.paidStatus = true;
      await bill.save();

      res.status(200).json(transaction);
    }
  } catch (error) {
    res.status(500).json(error);
  }
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

exports.getTransactionHistory = async (req, res) => {
  const { userId } = req.query;
  try {
    const transactions = await Transaction.find({ payor: userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
};
