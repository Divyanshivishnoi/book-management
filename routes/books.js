const express = require("express");
const router = express.Router();   //creating a router
const Book=require("../model/book"); //import the book model
router.post("/", async (req, res) => {   //route to create a new book
  try {
    const bookData = req.body;    //get the book deatils from the request body

    const newBook = new Book(bookData);  //create  a new book

    const savedBook = await newBook.save();   //saving the book to the database

    res.status(201).json(savedBook);   //send the response
  } catch (error) {
    console.error("Error creating book:", error);  //log the error
    res.status(500).json({ error: "Failed to create the book." });
  }
});

//get
router.get("/", async (req, res) => {  //route to fetch all books
  try {
    const books = await Book.find();

    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

//put

router.put("/:title", async (req, res) => {   //route to update a book by title
  try {
    const bookTitle = req.params.title;
    const updatedData = req.body;

    const updatedBook = await Book.findOneAndUpdate(  //find the book and update it
      { title: bookTitle },
      updatedData,
      { new: true }
    );
//if book is not found, then it show the 404 response
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {       
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Failed to update the book" });
  }
});

// Delete
router.delete("/:title", async (req, res) => {  //route to delete a book
  try {
    const bookTitle = req.params.title;

    const deletedBook = await Book.findOneAndDelete({ title: bookTitle });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res  //send a success response
      .status(200)
      .json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Failed to delete the book" });
  }
});

//  Genre
router.get("/genre/:genre", async (req, res) => {  //fetch books by genre
  try {
    const bookGenre = req.params.genre;

    const books = await Book.find({ genre: bookGenre });

    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "No books found for the specified genre" });
    }

    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books by genre:", error);
    res.status(500).json({ error: "Failed to fetch books by genre" });
  }
});

module.exports = router;
