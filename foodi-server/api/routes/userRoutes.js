const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.get("/", verifyToken, verifyAdmin, userController.getAllUsers);
router.get("/:email", userController.getUser);
router.post("/", userController.createUser);
router.delete("/:id",verifyToken, verifyAdmin, userController.deleteUser);
router.get("/admin/:email", verifyToken, userController.getAdmin);
router.patch("/admin/:id",verifyToken, verifyAdmin, userController.makeAdmin);
router.patch("/:email", verifyToken, userController.updateUser);

module.exports = router;
