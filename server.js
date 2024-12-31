const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();
require("./db/mongooseConnection")


const books = require("./routes/books");

app.use(express.json());
app.use("/books", books);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
