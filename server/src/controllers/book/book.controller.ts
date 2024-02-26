import { BookSchemaValidate } from "../../model/book/book.model";
import { Request, Response } from "express";
import { BookServices } from "../../services/book/book.service";
const { createBook, deleteBook, getBook, getBooks, updateBook, searchBook } =
  BookServices;

class BookController {
  //add book controller
  addBook = async (req: Request, res: Response) => {
    const data = {
      title: req.body.title,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
      picture: req.file?.path,
    };

    try {
      //validating the request
      const { error, value } = BookSchemaValidate.validate(data);
      console.log("the book values and error", error);
      if (error) {
        res.status(400).send(error);
      } else {
        const book = await createBook(value);
        res.status(201).send(book);
      }
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  };

  //get all Books
  getBooks = async (req: Request, res: Response) => {
    const books = await getBooks();

    try {
      res.send(books);
    } catch (error) {
      res.send(error);
    }
  };

  //get a single Book
  getBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const book = await getBook(id);
      res.send(book);
    } catch (error) {
      res.send(error);
    }
  };

  //update book
  updateBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log("book id", id);
    const data = {
      title: req.body.title,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
      picture: req.file?.path,
    };
    try {
      const book = await updateBook(id, data);
      res.send(book);
    } catch (error: any) {
      res.send(error);
    }
  };

  //delete a book
  deleteBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await deleteBook(id);
      res.send("book deleted successfully");
    } catch (error: any) {
      res.send(error);
    }
  };

  searchBook = async (req: Request, res: Response) => {
    const searchQuery = req.query.search as string;
    try {
      const searchResult = await searchBook(searchQuery);
      res.send(searchResult);
    } catch (error: any) {
      res.send(error);
    }
  };
}

//export class
export const BookControllers = new BookController();
