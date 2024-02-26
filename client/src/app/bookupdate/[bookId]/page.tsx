import { getBook } from "@/app/apiCalls/bookApiCalls";
import Layout from "@/app/components/Layout/Layout";
import UpdateBook from "@/app/components/UpdatBook/UpdateBook";
import { transformImagePath } from "@/app/utils/utils";
import React from "react";

const page = async ({ params }: any) => {
  const bookId = params["bookId"];
  const book = await getBook(bookId);
  const transformBook = (book: any) => {
    return {
      ...book,
      picture: book.picture ? transformImagePath(book.picture) : "",
    };
  };
  const newBook = transformBook(book);
  return (
    <Layout>
     
      <UpdateBook book={newBook} />
    </Layout>
  );
};

export default page;
