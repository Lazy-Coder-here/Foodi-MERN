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
    const cartIds = payment.cartItems.map((id) =>
      ObjectId.createFromHexString(id)
    );
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
      return res.status(403).json({ message: "Forbidden Access!" });
    }

    const result = await Payment.find(query).sort({ createdAt: -1 }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all payments
const allPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).sort({ createdAt: -1 }).exec();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// confirm order status
const confirmPayment = async (req, res) => {
  const payId = req.params.id;
  const { status } = req.body;
  try {
    const updatedStatus = await Payment.findByIdAndUpdate(
      payId,
      { status: "Confirmed" },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedStatus) {
      return res.status(404).json({ message: "Order Not Found!" });
    }

    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete an order
const deletePayment = async (req, res) => {
  const payId = req.params.id;
  try {
    const deletedOrder = await Payment.findByIdAndDelete(payId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order Not Found!" });
    }
    res.status(200).json({ message: "Order deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  PaymentInfo,
  getTransactions,
  allPayments,
  confirmPayment,
  deletePayment,
};
