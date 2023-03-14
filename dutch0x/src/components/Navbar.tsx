import Image from "next/image";
import React from "react";
import {
  Ellipse,
  Mail,
  Notification,
  Search,
  User
} from "./AllSVG";
import Frame from "./Frame";

const Navbar = () => {
  return (
    <>
      <div className="h-[293px] w-full flex flex-col bg-light border-b border-[#0000001a] shadow-[0px,1px,2px,rgba(0,0,0,0.06)]">
        <div className="flex p-6 justify-between items-center md:gap-[20px] lg:gap-[20px] xl:gap-[40px] 2xl:gap-[70px] gap-14">
          <Image
            className="w-[145.31px] h-9"
            src={require("../assets/images/logo.png")}
            alt="logo"
          />
          <ul className="text-base font-normal text-dark flex items-center justify-start md:gap-[20px] lg:gap-[20px] xl:gap-[40px] 2xl:gap-[70px] gap-14">
            <li className="font-bold text-primary relative">
              Dashboard{" "}
              <Ellipse
                color="#FF4800"
                className="absolute left-[calc(50%-5px/2+0.05px)] top-6"
              />
            </li>
            <li>Create</li>
            <li className="relative">
              Marketplace
              <span className="absolute left-[0.45px] top-5 font-medium text-xs text-[#FF4800]">
                Coming soon
              </span>
            </li>
            <li>Learn</li>
          </ul>
          <div className="flex items-center py-[6px] pr-[6px] pl-4 border border-secondary rounded-lg h-9 justify-between">
            <div className="flex items-center gap-[10px] md:w-[200px] lg:w-[230px] xl:w-[350px] w-[500px]">
              <Search />
              <input
                className="w-full h-6 text-base text-dark font-normal"
                type="text"
                placeholder="Find Holders"
              />
            </div>
            <div className="bg-secondary rounded-sm px-2">
              <span>/</span>
            </div>
          </div>
          <button className="py-1 px-2 flex items-center justify-center gap-1 font-bold text-xs text-[#3CAA2A] h-[26px] bg-[#3caa2a33] rounded">
            <Ellipse color="#3CAA2A" /> STATUS
          </button>
          <div className="flex items-between md:gap-[20px] lg:gap-[20px] xl:gap-[40px] gap-14">
            <Notification />
            <Mail />
            <User />
          </div>
        </div>
        <Frame />
      </div>
    </>
  );
};

export default Navbar;
