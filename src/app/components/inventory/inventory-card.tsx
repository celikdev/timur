import React from "react";
import { Key } from "react-hook-form/dist/types/path/common";
import Kilic from "@/assets/img/kilic.png";
import Heart from "@/assets/img/heart.png";

const InventoryCard = ({ data, name }: any) => {
  return (
    <>
      <div className="bg-dark_light_2 rounded-lg shadow-lg flex flex-col p-4 h-1/3 gap-2">
        <h1 className="font-bold">Chests</h1>
        <div className="grid grid-cols-4 grid-rows-auto gap-4 h-full overflow-y-auto overflow-x-hidden px-2">
          {/* Chests */}
          {data[1]?.data.body.length ? (
            data[1]?.data.body.map((x: any, index: Key) => (
              <div
                key={index}
                className="rounded-lg h-full bg-dark flex flex-col items-center justify-around"
              >
                <img
                  src={process.env.NEXT_PUBLIC_API_URL + x.photo}
                  className="w-1/3"
                />
                <h1 className="font-bold text-sm">{x.name}</h1>
              </div>
            ))
          ) : (
            <h1 className="font-semibold opacity-50">Item Not Found!</h1>
          )}
        </div>
      </div>
      <div className="bg-dark_light_2 rounded-lg shadow-lg flex flex-col p-4 h-1/3 gap-2">
        <h1 className="font-bold">Potions</h1>
        <div className="grid grid-cols-4 grid-rows-auto gap-4 h-full overflow-y-auto overflow-x-hidden px-2">
          {/* Potions */}
          {data[2]?.data.body.length ? (
            data[2]?.data.body.map((x: any, index: Key) => (
              <div
                key={index}
                className="rounded-lg h-full bg-dark flex flex-col items-center justify-around"
              >
                <img
                  src={process.env.NEXT_PUBLIC_API_URL + x.photo}
                  className="w-1/3"
                />
                <h1 className="font-bold text-sm">{x.name}</h1>
              </div>
            ))
          ) : (
            <h1 className="font-semibold text-lg opacity-50">
              Item Not Found!
            </h1>
          )}
        </div>
      </div>
      <div className="bg-dark_light_2 rounded-lg shadow-lg flex flex-col p-4 h-1/3 gap-2">
        <h1 className="font-bold text-lg">Ducks</h1>
        <div className="grid grid-cols-4 grid-rows-auto gap-4 h-full overflow-y-auto overflow-x-hidden px-2">
          {/* Potions */}
          {data[0]?.data.body.length ? (
            data[0]?.data.body.map((x: any, index: Key) => (
              <div
                key={index}
                className="rounded-lg h-full bg-dark flex flex-col items-center justify-around gap-2"
              >
                <span className="flex w-full justify-between px-2 pt-2">
                  <h1 className="bg-heading px-2 rounded-lg text-dark font-semibold text-sm">
                    {x.gender ? "Male" : "Female"}
                  </h1>
                  <h1 className="font-semibold text-sm">Breed Count</h1>
                </span>
                <img
                  src={process.env.NEXT_PUBLIC_API_URL + x.photo}
                  className="w-1/3"
                />
                <h1 className="font-bold text-sm">{x.name}</h1>
                <div className="flex w-full px-2 pt-2 items-center justify-center gap-2">
                  <span className="flex gap-1 justify-center items-center">
                    <img src={Heart.src} className="w-5 h-5" />
                    <h1 className="text-sm font-bold">{x.base_power}</h1>
                  </span>
                  <span className="flex gap-1 justify-center items-center">
                    <img src={Kilic.src} className="w-5 h-5" />
                    <h1 className="text-sm font-bold">{x.base_power}</h1>
                  </span>
                </div>
              </div>
            ))
          ) : (
            <h1 className="font-semibold opacity-50">Item Not Found!</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default InventoryCard;