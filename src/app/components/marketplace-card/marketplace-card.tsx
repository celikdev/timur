import React from "react";
import { Key } from "react-hook-form/dist/types/path/common";

const MarketplaceCard = ({ data, name }: any) => {
  return (
    <>
      <div className="bg-dark_light_2 rounded-lg shadow-lg flex flex-col p-4 h-1/2 gap-2">
        <h1 className="font-bold">Chests</h1>
        <div className="grid grid-cols-4 grid-rows-auto gap-4 h-full overflow-y-auto overflow-x-hidden px-2">
          {/* Chests */}
          {data[0]?.data.body.length ? (
            data[0]?.data.body.map((x: any, index: Key) => (
              <div
                key={index}
                className="rounded-lg h-4/5 bg-dark flex flex-col items-center justify-around"
              >
                <img
                  src={process.env.NEXT_PUBLIC_API_URL + x.photo}
                  className="w-1/3"
                />
                <div className="flex flex-col gap-2 items-center justify-center w-full">
                  <h1 className="font-bold text-sm">{x.name}</h1>
                  <h1 className="font-black text-xl">{x.price}</h1>
                  <button className="w-3/4 bg-heading py-2 rounded-lg transition-colors duration-300 hover:bg-heading_dark">
                    <h1 className="font-semibold text-dark text-sm">Buy</h1>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1 className="font-semibold opacity-50">Item Not Found!</h1>
          )}
        </div>
      </div>
      <div className="bg-dark_light_2 rounded-lg shadow-lg flex flex-col p-4 h-1/2 gap-2">
        <h1 className="font-bold">Potions</h1>
        <div className="grid grid-cols-4 grid-rows-auto gap-4 h-full overflow-y-auto overflow-x-hidden px-2">
          {/* Potions */}
          {data[1]?.data.body.length ? (
            data[1]?.data.body.map((x: any, index: Key) => (
              <div
                key={index}
                className="rounded-lg h-4/5 bg-dark flex flex-col items-center justify-around"
              >
                <img
                  src={process.env.NEXT_PUBLIC_API_URL + x.photo}
                  className="w-1/3"
                />
                <div className="flex flex-col gap-2 items-center justify-center w-full">
                  <h1 className="font-bold text-sm">{x.name}</h1>
                  <h1 className="font-black text-xl">{x.price}</h1>
                  <button className="w-3/4 bg-heading py-2 rounded-lg transition-colors duration-300 hover:bg-heading_dark">
                    <h1 className="font-semibold text-dark text-sm">Buy</h1>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1 className="font-semibold text-lg opacity-50">
              Item Not Found!
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default MarketplaceCard;
