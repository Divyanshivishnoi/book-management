//schema
const mongoose=require('mongoose')  //import the mongoose
const bookSchema = new mongoose.Schema({   //creating a schema for a book
  title: {      //title of the bbok
    type: String,
    required: true,
  },
  author: {    //author of the book
    type: String,
    required: true,
  },
  publishedDate: {     //the data of the bbok which was published
    type: Date,
    default: Date.now,
  },

  genre: {        //genre of the book
    type: String,
  },
  price: {            //price of the book
    type: Number,
    min: [0, "price must be a positive value"],
    validate: {
      validator: (value) => value >= 0,
      message: "price must be a positive number",
    },
  },
});
//exporting the book model so it can be used in other files
module.exports = mongoose.model("Book", bookSchema);
