const axios = require("axios");
const Khalti = require("../models/Khalti");

const verifyPayment = async (actualAmount, payload) => {
  try {
    let data = {
      token: payload.token,
      amount: payload.amount,
    };

    let config = {
      headers: {
        Authorization: "Key test_secret_key_8b91062616f445d88aa2ff1b48a8c6ec",
      },
    };

    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      data,
      config
    );

    const { idx, type, user, token, created_on } = response.data;
    const khalti = new Khalti({
      idx: idx,
      user: user.name,
      paymentType: type.name,
      token: token,
      amount: actualAmount,
      paidDate: created_on,
    });

    await khalti.save();
    return khalti._id;
  } catch (error) {
    throw error;
  }
};

const getKhaltiDetails = async (_req, res) => {
  Khalti.find({}, (err, data) => {
    if (err) res.status(500).send(err);
    res.json(data);
  });
};

module.exports = {
  verifyPayment,
  getKhaltiDetails,
};
