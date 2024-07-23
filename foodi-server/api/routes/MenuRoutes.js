const express = require("express");
const router = express.Router();

const menuControllers = require("../controllers/menuControllers");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

// get all menu items
router.get("/", menuControllers.getAllMenuItems);
router.post("/", verifyToken, verifyAdmin, menuControllers.postMenuItem);
router.delete("/:id",verifyToken, verifyAdmin, menuControllers.deleteMenuItem);
router.get("/:id", menuControllers.singleMenuItem);
router.patch("/:id", verifyToken, verifyAdmin, menuControllers.updateMenuItem);

module.exports = router;
