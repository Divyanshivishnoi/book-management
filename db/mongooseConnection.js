const MONGODB_URI = process.env.MONGODB_URI;
const mongoose = require("mongoose");
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("connected to the database via mongoose"))
  .catch((err) => console.log(err));
  