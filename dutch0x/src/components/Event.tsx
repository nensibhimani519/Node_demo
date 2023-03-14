import Image from "next/image";
import React from "react";
import { Vector, VectorTime } from "./AllSVG";

let data = [
  {
    id: 1,
    calender: "Harvest",
    date: "2022-09-13 08:57:15",
    desc: "🍎🍌🍍The Fruit Salad Game🍆🥦🥕",
    name: "Manure",
    transaction: {
      success: 44,
      processing: 8,
      failed: 2,
    },
    class: "first-event",
  },
  {
    id: 2,
    calender: "It’s Raining",
    date: "2022-09-13 08:57:15",
    desc: "🍎🍌🍍The Fruit Salad Game🍆🥦🥕",
    name: "Water",
    transaction: {
      success: 100,
      processing: 0,
      failed: 0,
    },
    class: "sec-event",
  },
];

const Event = () => {
  return (
    <div className="flex flex-col gap-4 col-span-2">
      <p className="text-2xl font-normal text-[#00000080]">Events</p>
      {Array.isArray(data) &&
        data.map((item: any, index: number) => (
          <div
            className={`p-6 grid grid-cols-3 bg-[#ffffffcc] backdrop-blur-xl rounded-lg ${item?.class}`}
            key={index}
          >
            <div className="col-span-2 flex flex-col gap-[15px]">
              <div className="flex gap-[90px] ml-[-25px]">
                <div>
                  <div
                    className={`w-[35px] h-[28px] ${
                      item?.transaction?.success === 100
                        ? "bg-[#28458F]"
                        : "bg-[#3CAA2A]"
                    } relative`}
                  ></div>
                  <div
                    className={`flex items-center justify-center pt-[4.8px] pb-[3.2px] pr-2 pl-0 gap-[9.6px] w-[86px] h-[28px] ${
                      item?.transaction?.success === 100
                        ? "bg-[#28458F]"
                        : "bg-[#3CAA2A]"
                    } rounded-lg text-light text-xs font-bold absolute top-[24px] left-6`}
                  >
                    {item?.transaction?.success === 100 ? (
                      <div className="flex items-center justify-center">
                        <Image
                          src={require("../assets/images/CheckVector.png")}
                          alt="CheckVector"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center relative">
                        <Image
                          src={require("../assets/images/Airdrop.png")}
                          alt="Airdrop"
                        />
                        <Image
                          className="absolute top-[7px] left-[7px]"
                          src={require("../assets/images/SmAirdrop.png")}
                          alt="SmAirdrop"
                        />
                      </div>
                    )}
                    AIRDROP
                  </div>
                </div>
                <div className="flex items-center justify-center py-1 px-2 gap-2 bg-[#0000001a] rounded-lg w-30">
                  <Vector />
                  <p className="text-sm font-bold text-primary">
                    {item?.calender}
                  </p>
                </div>
                <div className="flex items-center py-1 px-2 gap-2 backdrop-blur rounded-lg text-sm text-[#000000b3] ml-[-85px]">
                  <VectorTime />
                  <h3 className="font-bold">Started</h3>
                  <p className="font-normal">{item?.date}</p>
                </div>
              </div>
              <p className="font-normal text-base text-primary">{item?.desc}</p>
              <div className="font-bold text-3xl text-primary">
                {item?.name} <span className="font-normal text-sm">x 100</span>
              </div>
              <div className="font-normal text-sm text-primary flex items-center gap-4">
                Wallet Transactions:
                <h6 className="font-bold">
                  {item?.transaction?.success}{" "}
                  <span className="font-normal">Success</span>
                </h6>
                <h6 className="font-bold">
                  {item?.transaction?.processing}{" "}
                  <span className="font-normal">Processing</span>
                </h6>
                <h6 className="font-bold">
                  {item?.transaction?.failed}{" "}
                  <span className="font-normal">Failed</span>
                </h6>
              </div>
              {item?.class === "first-event" ? (
                <div className="relative">
                  <Image
                    className="h-[14px]"
                    src={require("../assets/images/Rectangle.png")}
                    alt="Rectangle"
                  />
                  <Image
                    className="absolute top-0 h-[14px]"
                    src={require("../assets/images/RectangleFill.png")}
                    alt="RectangleFill"
                  />
                </div>
              ) : (
                <Image
                  src={require("../assets/images/FullFillRectangle.png")}
                  alt="FullFillRectangle"
                />
              )}
              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center py-2 px-4 gap-2 w-[126px] h-[40px] bg-primary rounded-lg font-bold text-base text-light">
                  More Details
                </button>
                {item?.transaction?.success !== 100 && (
                  <>
                    <button className="flex items-center justify-center py-2 px-4 gap-2 w-[82px] h-[40px] border border-primary rounded-lg font-normal text-base text-primary">
                      Cancel
                    </button>
                    <div className="flex items-center pl-2 gap-2 w-[196px] h-[24px] check">
                      <input type="checkbox" checked={true} />
                      <label className="font-normal text-base text-primary">
                        Receive report on email
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center">
              {item?.class === "first-event" ? (
                <Image
                  src={require("../assets/images/FirstEvent.png")}
                  alt="FirstEvent"
                />
              ) : (
                <Image
                  src={require("../assets/images/SecEvent.png")}
                  alt="SecEvent"
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Event;
