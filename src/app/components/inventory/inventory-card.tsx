import React, { useState, useEffect } from "react";
import { Key } from "react-hook-form/dist/types/path/common";
import Kilic from "@/assets/img/kilic.png";
import Heart from "@/assets/img/heart.png";
import CustomModal from "../modal/modal";
import axios from "axios";
import { useCookies } from "react-cookie";

const InventoryCard = ({ data, setSelectedChest, name }: any) => {
  const [cookie] = useCookies(["token"]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDuck, setSelectedDuck] = useState({} as any);
  const [price, setPrice] = useState("");

  const sellDuck = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/marketplace/duck/sell`,
        {
          id: selectedDuck.id,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
      .then((res) => {
        alert("Duck has been put on sale!");
        setModalIsOpen(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!modalIsOpen) {
      setSelectedDuck({} as any);
      setPrice("");
    }
  }, [modalIsOpen]);

  const filteredChests = data[1]?.data.body.filter((a) => !a.open);
  return (
    <>
      <div className="bg-dark_light_2 rounded-lg shadow-lg flex flex-col px-4 py-2 h-1/3 gap-2">
        <h1 className="font-bold">Chests</h1>
        <div className="grid grid-cols-4 grid-rows-auto gap-4 h-full overflow-y-auto overflow-x-hidden pr-2">
          {/* Filtrelenmiş chest'leri bir değişkene atalım */}

          {/* Eğer filtrelenmiş chestler varsa onları, yoksa "Item Not Found" yazısını render edelim */}
          {filteredChests && filteredChests.length > 0 ? (
            filteredChests.map((x: any, index: Key) => (
              <div
                key={index}
                className="rounded-lg h-full bg-dark flex flex-col items-center justify-around"
              >
                <img
                  src={process.env.NEXT_PUBLIC_API_URL + x.photo}
                  className="w-1/3"
                />
                <h1 className="font-bold text-sm">{x.name}</h1>
                <button
                  onClick={() => setSelectedChest(x)}
                  className="w-3/4 bg-heading py-2 rounded-lg transition-colors duration-300 hover:bg-heading_dark"
                >
                  <h1 className="font-semibold text-dark text-sm">Open</h1>
                </button>
              </div>
            ))
          ) : (
            <h1 className="font-semibold opacity-50">Item Not Found!</h1>
          )}
        </div>
      </div>
      <div className="bg-dark_light_2 rounded-lg shadow-lg flex flex-col px-4 py-2 h-1/3 gap-2">
        <h1 className="font-bold">Potions</h1>
        <div className="grid grid-cols-4 grid-rows-auto gap-4 h-full overflow-y-auto overflow-x-hidden pr-2">
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
      <div className="bg-dark_light_2 rounded-lg shadow-lg flex flex-col px-4 py-2 h-1/3 gap-2">
        <CustomModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col justify-between items-center gap-4">
              <h1 className="font-black text-2xl w-full text-start">
                Sell Duck
              </h1>
              {selectedDuck && (
                <div className="bg-dark_light_2 p-4 rounded-lg flex flex-col items-center justify-center">
                  <img
                    src={process.env.NEXT_PUBLIC_API_URL + selectedDuck.photo}
                    alt="duck"
                    className="w-32 h-32"
                  />
                  <h1 className="font-semibold text-sm">{selectedDuck.name}</h1>
                </div>
              )}
              <input
                pattern="[0-9]*"
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-2/5 bg-dark_light_2 rounded-lg p-2 text-center font-semibold text-sm"
              />
              <div className="w-full flex items-center justify-center">
                <button
                  onClick={() => {
                    sellDuck();
                  }}
                  className="w-2/4 bg-heading py-2 rounded-lg transition-colors duration-300 hover:bg-heading_dark"
                >
                  <h1 className="font-semibold text-dark text-sm">Sell</h1>
                </button>
              </div>
            </div>
          </div>
        </CustomModal>
        <h1 className="font-bold text-lg">Ducks</h1>
        <div className="grid grid-cols-4 grid-rows-auto gap-4 h-full overflow-y-auto overflow-x-hidden pr-2">
          {/* Potions */}
          {data[0]?.data.body.length ? (
            data[0]?.data.body.map((x: any, index: Key) => (
              <div
                key={index}
                className="rounded-lg h-full bg-dark flex flex-col items-center justify-around gap-2 py-4"
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
                <div className="w-full flex items-center justify-center">
                  <button
                    onClick={() => {
                      setSelectedDuck(x);
                      setModalIsOpen(true);
                    }}
                    className="w-3/4 bg-heading py-2 rounded-lg transition-colors duration-300 hover:bg-heading_dark"
                  >
                    <h1 className="font-semibold text-dark text-sm">Sell</h1>
                  </button>
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
