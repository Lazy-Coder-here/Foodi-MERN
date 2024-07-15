const mongoose = require("mongoose");
const Carts = require("../models/Carts");
const Payment = require("../models/Payments");
const ObjectId = mongoose.Types.ObjectId;

// post payment info to db
const PaymentInfo = async (req, res) => {
  const payment = req.body;
  try {
    const paymentRequest = await Payment.create(payment);

    // delete cart after payment
    const cartIds = payment.cartItems.map((id) => new ObjectId(id));
    const deleteCartRequest = await Carts.deleteMany({ _id: { $in: cartIds } });

    res.status(200).json({ paymentRequest, deleteCartRequest });
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

// get transaction details of a user
const getTransactions = async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  try {
    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      res.status(403).json({ message: "Forbidden Access!" });
    }

    const result = await Payment.find(query).sort({ createdAt: -1 }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = { PaymentInfo, getTransactions };
