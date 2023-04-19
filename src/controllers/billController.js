const Bill = require("../models/Bill");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const { Room } = require("../models/Room");
require("dotenv").config();

exports.createBill = async (req, res) => {
  try {
    const {
      room,
      generator,
      receiver,
      billDate,
      billAmount,
      electricityUnits,
      waterUnits,
      garbageRate,
      extraCharges,
      description,
    } = req.body;

    const bill = new Bill({
      room,
      generator,
      receiver,
      billDate,
      billAmount,
      electricityUnits,
      waterUnits,
      garbageRate,
      extraCharges,
      description,
    });

    // Save the bill

    // Get the receiver's email from the User schema
    const receiverUser = await User.findById(receiver);
    const receiverEmail = receiverUser.email;
    // Send email to the receiver
    await bill.save();

    await sendEmail(
      receiverEmail,
      `New Bill Issued - for ${bill.billDate}`,
      `Dear ${receiverUser.name},

We hope this email finds you well. We are writing to inform you that a new bill has been issued for your rental property. Please find below the details of the bill:

Bill Details:
-------------------------------------------------
- Bill No: ${bill._id}
- Room: ${room}
- Electricity Units: ${electricityUnits} units
- Water Units: ${waterUnits} units
- Garbage Rate: NPR ${garbageRate.toLocaleString()}
- Extra Charges: NPR ${extraCharges.toLocaleString()}
-------------------------------------------------
Bill Amount: NPR ${billAmount.toLocaleString()}


Bill Description: ${description}

Please ensure that the bill amount is paid as soon as possible. If you have any questions or concerns regarding the bill, please feel free to reach out to us. We are here to assist you.
Thank you for your attention to this matter.

Best regards,
${generator}
Smart Rent Application`
    );

    res.status(200).json({ message: "Bill created successfully." });
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({ error: "Failed to create bill." });
  }
};

// Send email function using nodemailer
const sendEmail = async (toEmail, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Google_UserName,
        pass: process.env.Google_Password,
      },
    });

    // Compose the email
    const mailOptions = {
      from: process.env.Google_UserName,
      to: toEmail,
      subject: subject,
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
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

exports.getBill = async (req, res) => {
  const { userId } = req.query;
  try {
    // Find bills of the specified user
    const bills = await Bill.find({ receiver: userId });
    res.json(bills);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getInvoice = async (req, res) => {
  const { userId } = req.query;
  try {
    // Find bills of the specified user
    const bills = await Bill.find({ generator: userId });
    res.json(bills);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getSingleBill = (req, res) => {
  Bill.findById(req.params.billID, (err, data) => {
    if (err) res.status(500).send(err);
    res.json(data);
  });
};

exports.getTenantDetails = async (req, res, next) => {
  const { userId } = req.params;
  try {
    // Find rooms of the specified owner
    const rooms = await Room.find({ owner: userId });

    // Array to store tenant details
    const tenantDetails = [];

    // Iterate over each room
    for (const room of rooms) {
      // Find the tenant for the room
      const tenant = await User.findById(room.tenant);

      // If tenant exists, add the details to the array
      if (tenant) {
        const { name, contact, email, address } = tenant;
        const tenantInfo = {
          name,
          contact,
          email,
          address,
          roomId: room._id,
          flatRent: room.rentAmount,
          tenantId: tenant._id,
        };
        tenantDetails.push(tenantInfo);
      }
    }

    // Return the tenant details
    res.json(tenantDetails);
  } catch (error) {
    next(error);
  }
};
