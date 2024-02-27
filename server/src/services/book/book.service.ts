import { Books } from "../../model/book/book.model";

export class BookService {
  //add new  book to database
  async createBook(data: any) {
    try {
      const newBook = await Books.create(data);
      return newBook;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  //get all books from the database
  async getBooks() {
    try {
      const books = await Books.find({});
      const newBooks = books.map((book) => ({
        ...book.toObject(),
        id: book._id,
      }));
      return newBooks;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  //get a single book
  async getBook(id: string) {
    try {
      const book = await Books.findById({ _id: id });
      if (!book) {
        throw new Error(`book with id: ${id} does not exist`); ;
      }
      return book;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  //update a book
  async updateBook(id: string, data: any) {
    try {
      const book = await Books.findByIdAndUpdate({ _id: id }, data, {
        new: true,
      });
      if (!book) {
        throw new Error(`book with id: ${id} does not exist`) 
      }
      return book;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  //delete a book by using the find by id and delete
  async deleteBook(id: string) {
    try {
     
      const book = await Books.findByIdAndDelete(id);
      if (!book) {
        throw new Error(`book with id: ${id} does not exist`);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async searchBook(searchParam: string) {
    try {
      const regex = new RegExp(searchParam, "i");

      const searchResult = await Books.find({
        $or: [
          { title: { $regex: regex } },
          { description: { $regex: regex } },
        ],
      });

      return searchResult;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

//export the class
export const BookServices = new BookService();
