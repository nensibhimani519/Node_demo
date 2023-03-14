import Image from "next/image";
import React from "react";

let data = [
  {
    id: 1,
    bg: "bg-[#c0eec0]",
    name: "NFT Management",
    content: (
      <div className="bg-[#2EC62E] w-[60px] h-[74px] rounded-lg flex justify-between items-center">
        <div className="relative w-[45px] h-[55px]">
          <Image
            className="absolute top-0 left-[15px]"
            src={require("../assets/images/NFTPolygon.png")}
            alt="NETPolygon"
          />
          <Image
            className="absolute top-[5px] left-[20px]"
            src={require("../assets/images/SmPolygon.png")}
            alt="SmPolygon"
          />
          <Image
            className="absolute bottom-0 left-[12px]"
            src={require("../assets/images/NFT.png")}
            alt="NET"
          />
        </div>
      </div>
    ),
  },
  {
    id: 2,
    bg: "bg-[#fdf7d5]",
    name: "Find Holders",
    content: (
      <div className="relative w-[45px] h-[45px]">
        <Image
          className="absolute top-0 left-[-15px]"
          src={require("../assets/images/FindHolderCircle.png")}
          alt="FindHolderCircle"
        />
        <Image
          className="absolute top-0 left-[15px]"
          src={require("../assets/images/FindHolderCircle.png")}
          alt="FindHolderCircle"
        />
      </div>
    ),
  },
  {
    id: 3,
    bg: "bg-[#d5f3f8]",
    name: "Airdrop",
    content: (
      <Image
        className="w-[48px] h-[48px]"
        src={require("../assets/images/AirdropRectangle.png")}
        alt="AirdropRectangle"
      />
    ),
  },
  {
    id: 4,
    bg: "bg-[#eddbf4]",
    name: "Trade-in",
    content: (
      <div className="w-[43px] h-[43px] relative">
        <Image
          className="pb-1 absolute top-[-5px] left-[-7px]"
          src={require("../assets/images/UpRectangle.png")}
          alt="UpRectangle"
        />
        <Image
          className="absolute top-[25px] left-[7px]"
          src={require("../assets/images/DonwRectangle.png")}
          alt="DonwRectangle"
        />
      </div>
    ),
  },
  {
    id: 5,
    bg: "bg-[#fcdcef]",
    name: "Sales",
    content: (
      <Image
        className="w-[50px] h-[50px]"
        src={require("../assets/images/SalesPolygon.png")}
        alt="SalesPolygon"
      />
    ),
  },
];

const Frame = () => {
  return (
    <div className="grid grid-cols-5 gap-4 px-6">
      {Array.isArray(data) &&
        data.map((item: any, index: number) => (
          <div key={index}>
            <div className={`h-[151px] ${item?.bg} rounded-lg flex justify-center items-center`}>
              {item?.content}
            </div>
            <p className="font-bold text-base text-black items-center flex justify-center p-2">
              {item?.name}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Frame;
