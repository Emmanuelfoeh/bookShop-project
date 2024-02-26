"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Modal, message } from "antd";
import { useAppDispatch, useAppSelector } from "@/app/redux-impl/hooks";
import { addToCart } from "@/app/redux-impl/feature/cartSlice";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { ConfirmToast } from "react-confirm-toast";
import { deleteBook } from "@/app/apiCalls/bookApiCalls";
import { useRouter } from "next/navigation";

interface BookCardProps {
  book: any;
  ind: any;
}

const BookCard: React.FC<BookCardProps> = ({ book, ind }) => {
  const [user, setUser] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let loginUser = localStorage.getItem("user");
    if (loginUser) {
      const user = JSON.parse(loginUser);
      setUser(user[0]);
    }
  }, []);

  // console.log("the user", user?.user);

  const handleDeleteBook = async (book: any) => {
    if (book) {
      try {
        await deleteBook(book.id);
        messageApi.open({
          type: "success",
          content: "Book deleted successfully",
        });
        window.location.reload();
      } catch (error) {
        console.log("the error occurred", error);
        messageApi.open({
          type: "error",
          content: "Error deleting book",
        });
      }
    }
  };
  const dispatch = useAppDispatch();


  return (
    <div className="bookCard relative">
      {contextHolder}
      <Modal
        title="Book Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex">
          <div className="h-48">
            <Image
              className="h-full  bookImg"
              src={book?.picture}
              width={150}
              height={100}
              object-fit="cover"
              alt={book?.title}
            />
          </div>

          <div className="flex flex-col pt-2  px-2 mt-2  w-[60%]">
            <div className="pl-5 flex flex-col gap-3">
              <div className="flex gap-3 ">
                <p className="text-sm font-semibold">Title: </p>
                <p className="font-bold text-sm text-[#003060]">
                  {" "}
                  {book?.title}
                </p>
              </div>
              <div className="flex gap-3 ">
                <p className="text-sm font-semibold">Price: </p>
                <p className="font-bold text-sm text-[#003060]">
                  $ {book?.price}
                </p>
              </div>
              <div className="flex gap-3 ">
                <p className="text-sm font-semibold">Quantity: </p>
                <p className="font-bold text-sm text-[#003060]">
                  {book?.quantity}
                </p>
              </div>
              <div className="flex gap-3 ">
                <p className="text-sm font-semibold">Description: </p>
                <p className="font-bold text-sm text-[#003060]">
                  {book?.description}
                </p>
              </div>
            </div>

            <div className="pl-5 flex mt-10">
              <button
                className="bg-[#e55b13] font-bold text-white hover:bg-[#f5411d] px-3 rounded"
                onClick={() => dispatch(addToCart(book))}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Image
        className="h-1/2 w-full bookImg"
        src={book?.picture}
        width={250}
        height={100}
        object-fit="cover"
        alt={book?.title}
      />
      <div className="flex flex-col pt-2  px-2 mt-2">
        <div className="flex justify-between">
          <p className="font-bold text-sm text-[#003060]">{book?.title}</p>
          <p className="font-bold text-sm text-[#003060]">$ {book?.price}</p>
        </div>

        <div className="flex justify-between mt-2">
          <h6 className="text-[#a47551] mt-2 text-sm font-bold">
            Qty: <span>{book?.quantity}</span>
          </h6>
          <button
            className="bg-[#e55b13] font-bold text-white hover:bg-[#f5411d] px-3 rounded"
            onClick={() => dispatch(addToCart(book))}
          >
            Add
          </button>
        </div>
        <div className="mt-4 flex items-center gap-4 absolute top-0">
          <button onClick={showModal} className="bg-[#df7b45] p-1 rounded">
            <FaEye className="text-2xl text-white" />
          </button>
          {user?.user?.role.toUpperCase() === "ADMIN" && (
            <Link
              href={`bookupdate/${book.id}`}
              className="bg-[#eaeaf5] p-1 rounded"
            >
              <FaEdit className="text-2xl text-blue-600" />
            </Link>
          )}

          {user?.user?.role.toUpperCase() === "ADMIN" && (
            <ConfirmToast
              asModal={true}
              message={`Do you want to delete this book(${book.title})?`}
              showCloseIcon={false}
              customFunction={() => handleDeleteBook(book)}
            >
              <button className="bg-[#f3bfbf] p-1 rounded">
                <MdOutlineRemoveCircleOutline className="text-2xl text-red-600" />
              </button>
            </ConfirmToast>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
