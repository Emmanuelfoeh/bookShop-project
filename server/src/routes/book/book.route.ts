import express from "express";
import { BookControllers } from "../../controllers/book/book.controller";
import multer from "multer";
import path, { join } from "path";
//initiating the router
export const bookRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "../../../../client/public/images"));
  },
  filename: (req, file, cb) => {
    console.log("file filename", file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const { addBook, deleteBook, searchBook, getBook, getBooks, updateBook } =
  BookControllers;

//add book route
bookRouter.post("/", upload.single("picture"), addBook);

//get books
bookRouter.get("/", getBooks);

bookRouter.get("/search", searchBook);

//get single book
bookRouter.get("/:id", getBook);

//update a book
bookRouter.put("/:id", upload.single("picture"), updateBook);

//delete a book
bookRouter.delete("/:id", deleteBook);
