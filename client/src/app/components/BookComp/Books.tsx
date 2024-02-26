"use client";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import { Skeleton, message } from "antd";
import { BASE_URL } from "@/app/apiCalls/bookApiCalls";
import { transformBookData } from "@/app/utils/utils";

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams, setSearchParams] = useState<string>("");

  interface Book {
    id: string;
    title: string;
    description: string;
    quantity: number;
    picture: string;
    __v: number;
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(event.target.value);
  };

  useEffect(() => {
    let apiUrl = BASE_URL;

    if (searchParams && searchParams.length > 2) {
      apiUrl = `${BASE_URL}/search?search=${searchParams}`;
    }
    fetch(apiUrl)
      .then((res) => res.json())
      .then((books) => {
        const transformedBookData: Book[] = transformBookData(books);
        setBooks(transformedBookData);
        setIsLoading(false);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Error fetching Books",
        });
      });
  }, [searchParams]);

  if (isLoading) return <Skeleton active />;
  if (!books) return <p>No Book Available</p>;

  console.log("all books", books);
  console.log("console log searchParams", searchParams);

  return (
    <section className="flex flex-col">
      {contextHolder}
      <div className="flex justify-between mb-5">
        <h5 className="text-2xl">Available Books</h5>
        <div>
          <input
            type="search"
            name="book"
            value={searchParams}
            onChange={handleSearchChange}
            className="p-2 border border-gray-200 outline-none"
            placeholder="search..."
          />
        </div>
      </div>
      <div className="grid  md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-5 py-3">
        {books.map((book: any, ind: any) => (
          <BookCard book={book} ind={ind} key={book?.id} />
        ))}
      </div>
    </section>
  );
};

export default Books;
