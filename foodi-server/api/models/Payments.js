const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const paymentSchema = new Schema({
  transactionId: String,
  email: String,
  price: Number,
  status: String,
  itemName: Array,
  cartItems: Array,
  menuItems: [
    {
      itemId: { type: ObjectId, required: true }, // Reference to menu item ID
      quantity: { type: Number, required: true }, // Quantity of this specific item purchased
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// create model
const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
