const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentControllers");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, paymentController.PaymentInfo);
router.get("/", verifyToken, paymentController.getTransactions);

module.exports = router;
