"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import InventoryCard from "../components/inventory/inventory-card";

const InventoryContent = () => {
  const [cookie] = useCookies(["token"]);
  const [data, setData] = useState([]);

  const getInventory = async () => {
    try {
      const endpoints = ["/user/ducks", "/user/chests", "/user/potions"];
      const request = endpoints.map((endpoint) =>
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        })
      );
      const data = await Promise.all(request);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <div className="w-full py-4 flex flex-col gap-4">
      <div className="bg-dark_light w-full h-full rounded-lg p-4 flex flex-col justify-around gap-4">
        <InventoryCard data={data} />
      </div>
    </div>
  );
};

export default InventoryContent;
