"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import nft_data from "@/data/nft-data";
import NftItemBox from "./nft-item-box";
import { useCookies } from "react-cookie";

const NftItemArea = () => {
  const [cookie] = useCookies(["token"]);
  const [data, setData] = useState([]);

  //TODO:Burası User'dan Degil, MarketPlace'den Cekilecek!
  const getDucks = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/ducks`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => setData(res.data.body))
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    getDucks();
  }, []);

  console.log(data);
  return (
    <section className="nft-item__area">
      <div className="container custom-container">
        <div className="row justify-content-center">
          {data.slice(0, 3).map((item) => (
            //@ts-ignore
            <div key={item.id} className="col-xxl-4 col-xl-5 col-lg-6 col-md-9">
              <NftItemBox item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NftItemArea;
