const User = require("../models/Users");
const Payment = require("../models/Payments");
const Menu = require("../models/Menu");

// get all order stats
const getAllOrders = async (req, res) => {
  try {
    const result = await Payment.aggregate([
      {
        $unwind: "$menuItems",
      },
      {
        $lookup: {
          from: "menus",
          localField: "menuItems.itemId",
          foreignField: "_id",
          as: "menuItemDetails",
        },
      },
      {
        $unwind: "$menuItemDetails",
      },
      {
        $group: {
          _id: "$menuItemDetails.category",
          quantity: { $sum: "$menuItems.quantity" },
          revenue: {
            $sum: {
              $multiply: ["$menuItemDetails.price", "$menuItems.quantity"],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          quantity: "$quantity",
          revenue: "$revenue",
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllOrders,
};
