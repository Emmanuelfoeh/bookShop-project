"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import { FaBars } from "react-icons/fa";
import { Badge } from "antd";
import { FaCartPlus } from "react-icons/fa6";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useAppDispatch, useAppSelector } from "@/app/redux-impl/hooks";
import { calculateTotals } from "@/app/redux-impl/feature/cartSlice";
const Navbar = () => {
  const [user, setUser] = useState<any>({});
  const currentPath = usePathname();
  const [mobileNav, showMobileNav] = useState(false);
  const { cartItems, amount } = useAppSelector((store) => store.cart);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const toggleNav = () => {
    showMobileNav(!mobileNav);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={"/profile"}>profile</Link>,
    },
  ];

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const checkout = () => {
    if (!user.user) {
      router.push("/login");
    }
    if (user.user) router.push("/checkout");
  };

  const orders = () => {
    if (!user.user) {
      router.push("/login");
    }
    if (user.user) router.push("/orders");
  };

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    let loginUser = localStorage.getItem("user");
    if (loginUser) {
      const user = JSON.parse(loginUser);
      setUser(user[0]);
    }
  }, []);

  console.log("the user", user?.user);
  console.log(
    "the ser?.user?.role.toUpperCase()",
    user?.user?.role.toUpperCase()
  );

  return (
    <header className=" bg-white z-50 sticky top-0 p-2">
      <div className="w-[95%] mx-auto flex items-center justify-between z-40 relative">
        <div className=" flex items-center gap-3">
          <button className="flex md:hidden" onClick={toggleNav}>
            <FaBars />
          </button>
          <Link className="text-2xl font-bold text-[#003060]" href={"/"}>
            Bookshop
          </Link>
        </div>

        <nav
          className={classNames({
            "flex flex-col px-3 pb-4 absolute z-30 left-0 top-12 bg-white  gap-3 shadow-md":
              true,
            hidden: mobileNav === false,
          })}
        >
          {user?.user?.role.toUpperCase() === "ADMIN" && (
            <Link
              href={"/add-book"}
              className=" text-[#003060] font-semibold hover:text-[#e55b13]"
            >
              Add Book
            </Link>
          )}

          <Link
            href={"/orders"}
            className={classNames({
              "text-[#003060] font-semibold hover:text-[#e55b13]": true,
              "text-[#e55b13]": currentPath == "/orders",
            })}
          >
            Orders
          </Link>

          <div className="flex items-center">
            {user.user?.email === undefined && (
              <Link
                href={"/signUp"}
                className=" px-2  py-1 rounded  font-bold bg-[#e55b13] text-white"
              >
                Sign up
              </Link>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-10">
          <nav className="hidden  md:flex gap-3  items-center">
            {user?.user?.role.toUpperCase() === "ADMIN" && (
              <Link
                href={"/add-book"}
                className={classNames({
                  "text-[#003060] font-semibold hover:text-[#e55b13]": true,
                  "text-[#e55b13]": currentPath == "/add-book",
                })}
              >
                Add Book
              </Link>
            )}

            <button
              onClick={orders}
              className={classNames({
                "text-[#003060] font-semibold hover:text-[#e55b13]": true,
                "text-[#e55b13]": currentPath == "/orders",
              })}
            >
              Orders
            </button>

            {user.user?.email === undefined && (
              <Link
                href={"/signUp"}
                className="flex px-3   py-1 rounded  border-[0.5px] font-bold bg-[#e55b13] text-white"
              >
                Sign up
              </Link>
            )}
          </nav>
          <div className="flex items-center gap-10 md:gap-8  mr-8 md:mr-5">
            {user.user?.email !== undefined && (
              <button
                onClick={logout}
                className="text-[#003060] px-3 py-1 rounded border-[#e55b13] border-[0.5px] font-bold hover:bg-[#e55b13] hover:text-white"
              >
                Log out
              </button>
            )}

            {user.user?.email === undefined && (
              <Link
                href={"/login"}
                className="text-[#003060] px-3 py-1 rounded border-[#e55b13] border-[0.5px] font-bold hover:bg-[#e55b13] hover:text-white"
              >
                Log in
              </Link>
            )}

            <button onClick={checkout} className="flex">
              <FaCartPlus />
              <Badge count={`${amount}`} />
            </button>
            {user.user?.email !== undefined && (
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <span className="text-[#003060]">{user.user?.email}</span>

                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
