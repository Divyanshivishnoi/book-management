//schema
const mongoose=require('mongoose')
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },

  genre: {
    type: String,
  },
  price: {
    type: Number,
    min: [0, "price must be a positive value"],
    validate: {
      validator: (value) => value >= 0,
      message: "price must be a positive number",
    },
  },
});

module.exports = mongoose.model("Book", bookSchema);
