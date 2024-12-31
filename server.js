const express = require("express");  //import the express
const dotenv = require("dotenv");   //import the dotenv 
dotenv.config();  //it is used to loading the .env file
const PORT = process.env.PORT || 4000;  //set the port
const app = express();      //creating an instance of the express application
require("./db/mongooseConnection")   //importing and intializing the database connection


const books = require("./routes/books");  //import the books

app.use(express.json());      //middleware for json data
app.use("/books", books);    

//here we start the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
