const User = require("../models/Users");
const Payment = require("../models/Payments");
const Menu = require("../models/Menu");

// get all orders, users, payments, menu items length
const getAllInfo = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const menuItems = await Menu.countDocuments();
    const orders = await Payment.countDocuments();

    const result = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
        },
      },
    ]);

    const revenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.status(200).json({
      users,
      menuItems,
      orders,
      revenue,
    });
  } catch (error) {
    res.status(error.status).send("Internal Server Error: " + error.message);
  }
};

module.exports = {
  getAllInfo,
};
