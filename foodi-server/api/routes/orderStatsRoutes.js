const express = require("express");
const router = express.Router();

const orderStatControllers = require("../controllers/orderStatControllers");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.get("/", verifyToken, verifyAdmin, orderStatControllers.getAllOrders);

module.exports = router;
