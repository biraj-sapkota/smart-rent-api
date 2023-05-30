const Contract = require("../models/Contract");

exports.createContract = (req, res) => {
  const contract = new Contract(req.body);

  contract
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((_err) => {
      res.status(500).send("Error creating the contract.");
      console.log(_err);
    });
};

exports.updateContract = (req, res) => {
  Contract.findOneAndUpdate(
    { _id: req.params.contractID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, data) => {
      if (err) res.status(500).send(err);
      res.json(data);
    }
  );
};

exports.deleteContract = (req, res) => {
  Contract.deleteOne({ _id: req.params.contractID }, (err) => {
    if (err) res.status(500).send(err);
    res.send("Contract Deleted Successfully!!");
  });
};

exports.getContract = async (req, res) => {
  const { userId } = req.query;
  try {
    
    const contracts = await Contract.find({ tenant: userId }).populate("room");

    res.json(contracts);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getContracts = async (req, res) => {
  const { userId } = req.query;
  try {
    
    const contracts = await Contract.find({ owner: userId }).populate("room");

    res.json(contracts);
  } catch (error) {
    res.status(500).json(error);
  }
};
