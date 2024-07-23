const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentControllers");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.post("/", verifyToken, paymentController.PaymentInfo);
router.get("/", verifyToken, paymentController.getTransactions);
router.get("/all", verifyToken, verifyAdmin, paymentController.allPayments);
router.patch("/:id", verifyToken, verifyAdmin, paymentController.confirmPayment);
router.delete("/:id", verifyToken, verifyAdmin, paymentController.deletePayment);

module.exports = router;
