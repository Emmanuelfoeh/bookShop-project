"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../redux-impl/hooks";
import {
  MdAddCircleOutline,
  MdDoDisturbOn,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { Modal, message } from "antd";
import {
  clearCart,
  decrease,
  increase,
  removeItem,
} from "../redux-impl/feature/cartSlice";
import Navbar from "../components/navbar/Navbar";
import { ORDER_BASE_URL } from "../apiCalls/orderApiCalls";

const CartPage = () => {
  const [user, setUser] = useState();
  const { cartItems, total } = useAppSelector((state) => state.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  // console.log("the total amount of cart items", total);
  // console.log("the total amount of cart items", cartItems);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const makePayment = async () => {
    let itemData;
    if (cartItems.length > 0) {
      const items = cartItems.map((item) => {
        return { quantity: item.amount, bookId: item.id };
      });

      itemData = {
        userId: user?.user?._id,
        totalAmount: total,
        items,
        status: "Paid",
      };
    }
    try {
      console.log("order items", itemData);
      const payment = await fetch(ORDER_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      if (!payment.ok) {
        messageApi.open({
          type: "error",
          content: "Error Making Payment",
        });
      } else {
        const order = await payment.json();
        messageApi.open({
          type: "success",
          content: "Payment successful",
        });
        dispatch(clearCart());
        setIsModalOpen(false);
        return order;
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error Making Payment",
      });
    }
  };

  useEffect(() => {
    let loginUser = localStorage.getItem("user");
    if (loginUser) {
      let user = JSON.parse(loginUser);
      setUser(user[0]);
    }
  }, []);

  return (
    <div className="bg-[#e8e8e8]">
      {contextHolder}
      <Navbar />
      <div className="h-fit pb-36 bg-[#e8e8e8]">
        <Modal
          title="Payment Details"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="flex gap-4 flex-col text-[#003060]">
            <input
              type="number"
              placeholder="Enter Amount"
              className="p-2 outline-none w-1/2"
            />

            <div>
              <button
                onClick={makePayment}
                className="text-center font-semibold mb-3 mx-auto p-2 rounded-md text-white bg-[#f5411d]"
              >
                Make Payment
              </button>
            </div>
          </div>
        </Modal>
        <div className=" flex flex-col   md:justify-between md:flex-row gap-10  p-6 relative">
          <div className="cartContainer bg-white  mt-8  w-1/2  ml-6  text-[#003060]  rounded-md p-2">
            <h1 className="p-4 text-lg">Shopping Cart</h1>

            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item, ind) => {
                const { id, title, price, amount } = item;
                return (
                  <div
                    key={id}
                    className="cartItem border-t border-gray-700 flex flex-col gap-6 p-2 md:flex-row  md:p-5"
                  >
                    <div className="flex flex-row gap-4">
                      <div className="cartImgCover h-36">
                        <Image
                          src={`https://source.unsplash.com/random/?Book&${ind}`}
                          width={100}
                          height={100}
                          alt="title"
                          className="cartImg"
                        />
                      </div>

                      <div className="cartItemDetails  h-auto ">
                        <p>Title: {title}</p>
                        <p>Quantity:5</p>
                      </div>
                    </div>

                    <div className=" flex flex-row justify-between items-center md:items-start w-60  md:w-64">
                      <div className="actionBtn w-32 h-10 flex flex-row items-center justify-between">
                        <button
                          onClick={() => {
                            if (amount === 1) {
                              dispatch(removeItem(id));
                              return;
                            }
                            dispatch(decrease(item));
                          }}
                        >
                          <span>
                            <MdRemoveCircleOutline />
                          </span>
                        </button>
                        <p>{amount}</p>
                        <button
                          onClick={() => {
                            dispatch(increase(item));
                          }}
                        >
                          <span>
                            <MdAddCircleOutline />
                          </span>
                        </button>
                      </div>

                      <p className="pt-1">${price}</p>

                      <div className="flex ">
                        <button
                          onClick={() => {
                            dispatch(removeItem(id));
                          }}
                          className=""
                        >
                          <MdDoDisturbOn className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            {cartItems.length === 0 && (
              <p className="font-bold mx-auto text-[#c42e10] bg-[#dbb3ab] text-center rounded">
                {" "}
                YOUR CART IS EMPTY
              </p>
            )}
            {cartItems.length != 0 && (
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    dispatch(clearCart());
                  }}
                  className="mr-4 mb-5 p-2 text-white font-semibold rounded text-lg bg-[#dd5c42] hover:bg-[#c42e10]"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>

          <div className="summary min-h-fit bg-white text-[#003060] p-2 rounded-md z-20 fixed top-28 right-10">
            <h1 className="py-2 text-2xl">The summary</h1>

            <div className="flex flex-col mt-3 border-t border-dashed">
              <div className="flex mb-5 mt-2 flex-row justify-between">
                <h3 className="text-2xl">Total</h3>
                <p>${total.toFixed(2)}</p>
              </div>
              <div className="flex flex-col pb-3 ">
                <button
                  onClick={showModal}
                  className="w-full text-center font-semibold text-lg mb-3 mx-auto p-2 rounded-md text-white bg-[#f5411d]"
                >
                  Checkout
                </button>

                <Link
                  href={"/"}
                  className="w-full text-center hover:bg-[#f5411d] hover:text-white font-semibold text-lg text-gray-700 mx-auto p-2 rounded-md border border-gray-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
