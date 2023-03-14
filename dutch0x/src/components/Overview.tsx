import React from "react";
import { Arrow } from "./AllSVG";

let data = [
  {
    id: 1,
    child: [
      {
        name: "Wallet balance",
        rank: "0.489 ETH",
      },
    ],
  },
  {
    id: 2,
    title: "NFTs",
    child: [
      {
        name: "NFT items",
        rank: "187",
      },
      {
        name: "Collections",
        rank: "5",
      },
      {
        name: "Minted",
        rank: "39",
      },
    ],
  },
  {
    id: 3,
    title: "Saved Searches",
    child: [
      {
        name: "Green apple",
      },
      {
        name: "Christmas tree",
      },
    ],
  },
  {
    id: 4,
    title: "Recent Activity",
    child: [
      {
        name: "Settings > Account",
      },
      {
        name: "Sales reports",
      },
    ],
  },
];

const Overview = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-normal text-[#00000080]">Overview</p>

      {Array.isArray(data) &&
        data.map((item: any, index: number) => (
          <div
            className="p-4 w-full flex flex-col gap-7 bg-light border border-[#0000001a] shadow-[0px,1px,2px,rgba(0,0,0,0.05)] rounded-lg"
            key={index}
          >
            {!!item?.title && (
              <h1 className="font-medium text-xl text-[#000000]">
                {item?.title}
              </h1>
            )}
            {!!item?.child &&
              Array.isArray(item?.child) &&
              item?.child?.map((i: any, idx: number) => (
                <div className="flex items-center justify-between" key={idx}>
                  <h4 className="font-normal text-base text-[#00000099]">
                    {i?.name}
                  </h4>
                  <div className="flex items-center gap-4">
                    {i.rank && (
                      <p className="font-normal text-base text-primary">
                        {i?.rank}
                      </p>
                    )}
                    <Arrow />
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default Overview;
