const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.DB_URL;

// middlewares
app.use(cors());
app.use(express.json());

// mongodb configuration using mongoose
mongoose
  .connect(uri)
  .then(console.log("MongoDB connected!"))
  .catch((error) => console.log("Error connecting to MongoDB!", error));

// import routes
const menuRoutes = require("./api/routes/MenuRoutes");
const cartRoutes = require("./api/routes/CartRoutes");
const userRoutes = require("./api/routes/userRoutes");

app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
