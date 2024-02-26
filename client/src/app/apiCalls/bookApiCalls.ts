import axios from "axios";

export const BASE_URL = "http://localhost:8088/api/v1/books";

export const addNewBook = async (data: any) => {
  try {
    const response = await axios.post(BASE_URL, data);
    console.log("Response after save:", response.data);
    return response.data;
  } catch (error: any) {
    throw error.message;
  }
};

export const getAllBooks = async () => {
  try {
    const response = await axios.get(BASE_URL);
    console.log("Response for books", response.data);
    return response.data;
  } catch (error: any) {
    throw error.message;
  }
};

export const getBook = async (bookId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${bookId}`);
    console.log("get a single book", response.data);
    return response.data;
  } catch (error: any) {
    throw error.message;
  }
};

export const updateBook = async (bookId: string, book: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/${bookId}`, book);
    console.log("book updated successfully", response.data);
    return response.data;
  } catch (error: any) {
    throw error.message;
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${bookId}`);
    console.log("book has been deleted", response.data);
    return response.data;
  } catch (error: any) {
    throw error.message;
  }
};
export const searchBook = async (searchParam: string) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/search?search=${searchParam}`
    );
    console.log("searchbooks", response.data);
    return response.data;
  } catch (error: any) {
    throw error.message;
  }
};
