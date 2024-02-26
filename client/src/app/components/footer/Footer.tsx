import React from "react";
import Copyright from "./Copyright";
import { IoIosArrowForward } from "react-icons/io";

const Footer = () => {
  return (
    <section className="footer flex items-center justify-center  text-white bg-[#003060] h-[40vh]">
      <div className="main-content p-4 md:p-0 ">
        <div className="grid  md:grid-cols-4  sm:grid-cols-2 gap-y-4 grid-cols-2 mx-auto w-full md:w-[80%]">
          <div className="flex flex-col">
            <h1 className="mb-5">Let Us Help You</h1>
            <p className="text-[#ededed] text-xs">Your Account</p>
            <p className="text-[#ededed] text-xs">Your Oder</p>
          </div>
          <div className="flex flex-col">
            <h1 className="mb-5">Contact Us</h1>
            <p className="text-[#ededed] text-xs">+233 545805375</p>
            <p className="text-[#ededed] text-xs">+233 20549456</p>
          </div>
          <div className="flex flex-col">
            <h1 className="mb-5">Address</h1>
            <p className="text-[#ededed] text-xs">2nd Bedi Lane</p>
            <p className="text-[#ededed] text-xs">East Airport</p>
          </div>
          <div className="flex flex-col">
            <h1 className="mb-5">Subscribes</h1>
            <div>
              <div className="flex rounded-md w-fit">
                <input
                  type="text"
                  className="text-black outline-none p-1"
                  name="subscribe"
                />
                <button
                  type="button"
                  className="bg-[#e55b13] py-1 px-2 rounded-e"
                >
                  <IoIosArrowForward className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <Copyright />
      </div>
    </section>
  );
};

export default Footer;
