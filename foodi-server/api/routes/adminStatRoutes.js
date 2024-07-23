const express = require("express");
const router = express.Router();

const adminStatController = require("../controllers/adminStatControllers");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.get("/", verifyToken, verifyAdmin, adminStatController.getAllInfo);

module.exports = router;
