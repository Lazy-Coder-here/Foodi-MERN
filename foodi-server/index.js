const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.DB_URL;
const access_token = process.env.ACCESS_TOKEN;

// middlewares
app.use(cors());
app.use(express.json());

// mongodb configuration using mongoose
mongoose
  .connect(uri)
  .then(console.log("MongoDB connected!"))
  .catch((error) => console.log("Error connecting to MongoDB!", error));

// jwt authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, access_token, {
    expiresIn: "1h",
  });
  res.send({ token });
});

// import routes
const menuRoutes = require("./api/routes/MenuRoutes");
const cartRoutes = require("./api/routes/CartRoutes");
const userRoutes = require("./api/routes/userRoutes");
const verifyToken = require("./api/middlewares/verifyToken");

app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);

app.get("/", verifyToken, (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
