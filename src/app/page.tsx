"use client";

import React, { useEffect } from "react";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/header/header";
import HeroBanner from "./components/hero-banner/hero-banner";
import NftItemArea from "./components/nft-item/nft-item-area";
import VideoArea from "./components/video/video-area";
import RoadMapArea from "./components/road-map/road-map-area";
import Footer from "@/layout/footer/footer";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Home() {
  const [cookies, setCookie] = useCookies(["userID", "token"]);
  const getUser = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setCookie("userID", res.data.body.id, { path: "/" });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Wrapper>
      <Header />
      <main className="main--area">
        <HeroBanner />
        <NftItemArea />
        <VideoArea />
        <RoadMapArea />
      </main>
      <Footer />
    </Wrapper>
  );
}
