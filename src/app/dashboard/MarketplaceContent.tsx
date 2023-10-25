import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import MarketplaceCard from "../components/marketplace-card/marketplace-card";

const MarketplaceContent = () => {
  const [cookie] = useCookies(["token"]);
  const [data, setData] = useState([]);

  const getMarketplace = async () => {
    try {
      const endpoints = ["/marketplace/chest/list", "/marketplace/potion/list"];
      const request = endpoints.map((endpoint) =>
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        })
      );
      const data = await Promise.all(request);
      //@ts-ignore
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMarketplace();
  }, []);

  return (
    <div className="w-full py-4 flex flex-col gap-4">
      <div className="bg-dark_light w-full h-full rounded-lg p-4 flex flex-col gap-4">
        <MarketplaceCard data={data} />
      </div>
    </div>
  );
};

export default MarketplaceContent;
