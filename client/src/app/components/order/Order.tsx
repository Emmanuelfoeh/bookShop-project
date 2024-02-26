"use client";
import { ORDER_BASE_URL } from "@/app/apiCalls/orderApiCalls";
import { transformImagePath } from "@/app/utils/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Skeleton, message } from "antd";

const Order = () => {
  const [user, setUser] = useState<any>();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const getOrders = async (apiUrl: string) => {
    console.log("apiUrl fofofofofofof", apiUrl);
    try {
      const response = await fetch(apiUrl);
      const sOrders = await response.json();
      console.log("sOrders", sOrders);
      setOrders(sOrders);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      messageApi.open({
        type: "error",
        content: "Error fetching Orders",
      });
    }
  };

  useEffect(() => {
    let loginUser = localStorage.getItem("user");
    if (loginUser) {
      let user = JSON.parse(loginUser);
      setUser(user[0]);
    }

    let apiUrl = ORDER_BASE_URL;
    if (user?.user.role && user?.user?.role.toUpperCase() !== "ADMIN") {
      console.log("the user id", user?.user?._id);
      apiUrl = `${ORDER_BASE_URL}/${user?.user?._id}`;
    }

    getOrders(apiUrl);
  }, []);

  if (isLoading) return <Skeleton active />;
  if (!orders) return <p>No Orders Available</p>;

//   console.log("the user logo", user);
  console.log("orders in order", orders);
  return (
    <div>
      {contextHolder}
      <h3 className="text-3xl text-[#003060]">Orders</h3>
      <div className="grid  md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-5 py-3">
        {orders?.map((order) => {
          const {
            id: _id,
            totalAmount,
            items,
            userId,
            status,
            orderDate,
          } = order;
          const { firstName, lastName } = userId;
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          };
          const dateOrder = new Intl.DateTimeFormat("en-US", options).format(
            new Date(orderDate)
          );

          return (
            <div
              key={order.id}
              className="hover:shadow rounded border border-[#ccc] text-[#003060] p-2"
            >
              <h5>
                Owner:{" "}
                <span className="font-semibold">
                  {" "}
                  {firstName} {lastName}
                </span>
              </h5>
              <h5>
                Total Amount:{" "}
                <span className="font-semibold">{totalAmount}</span>{" "}
              </h5>
              <h5>
                Status: <span className="font-semibold">{status}</span>{" "}
              </h5>
              <h5>
                Date of order:{" "}
                <span className="font-semibold">{dateOrder}</span>{" "}
              </h5>
              <div>
                <h6 className="py-2 font-bold">Books</h6>
                <div className="grid grid-cols-2 gap-3">
                  {items.map((book: any, ind: any) => {
                    const { bookId, _id } = book;
                    const transformBook = (book: any) => {
                      return {
                        ...book,
                        picture: book.picture
                          ? transformImagePath(book.picture)
                          : "",
                      };
                    };
                    const sBook = transformBook(bookId);
                    return (
                      <div key={_id} className="flex gap-2 p-2">
                        <Image
                          src={sBook.picture}
                          height={40}
                          width={40}
                          alt="book"
                        />
                        <p className="text-sm">{sBook.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
