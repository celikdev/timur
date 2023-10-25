"use client";

import { Metadata } from "next";
import Wrapper from "@/layout/wrapper";
import { useState } from "react";
import DashboardContent from "./DashboardContent";
import InventoryContent from "./InventoryContent";
import MarketplaceContent from "./MarketplaceContent";
import ManageTeamsContent from "./ManageTeamsContent";
import ExploreContent from "./ExploreContent";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function ContactPage() {
  const [selectedButton, setSelectedButton] = useState("Dashboard");
  const buttonData = [
    {
      name: "Dashboard",
    },
    {
      name: "Inventory",
    },
    {
      name: "Marketplace",
    },
    {
      name: "Manage Teams",
    },
    {
      name: "Explore",
    },
  ];
  return (
    <Wrapper>
      {/* <h1>Dashboard</h1> */}
      <div className="container mx-auto h-[100vh] flex gap-4">
        <div className="w-2/6 h-full py-4 flex flex-col gap-4">
          <div className="w-full h-2/3 bg-dark_light flex flex-col gap-4 p-6 rounded-t-xl">
            {buttonData.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedButton(item.name)}
                className={`${
                  selectedButton === item.name ? "btn-selected" : "btn"
                }`}
                // className="w-full h-[10%] bg-heading text-dark rounded-lg font-semibold transition-all duration-300 hover:opacity-70"
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="w-full h-1/3 bg-dark_light p-4 flex flex-col rounded-b-xl">
            <p className="text-center font-bold text-white mb-4">
              Wallet Balance
            </p>
            <div className="w-full flex">
              <div className="flex flex-col gap-2 w-1/2">
                <h1 className="font-bold text-lg">CRA</h1>
                <h1 className="font-bold text-lg">TUS</h1>
                <h1 className="font-bold text-lg">AVAX</h1>
              </div>
              <div className="gap-2 w-1/2 flex flex-col items-end">
                <h1 className="font-bold text-lg">0</h1>
                <h1 className="font-bold text-lg">0</h1>
                <h1 className="font-bold text-lg">1.309</h1>
              </div>
            </div>
          </div>
        </div>
        {selectedButton === "Dashboard" ? (
          <DashboardContent />
        ) : selectedButton === "Inventory" ? (
          <InventoryContent />
        ) : selectedButton === "Marketplace" ? (
          <MarketplaceContent />
        ) : selectedButton === "Manage Teams" ? (
          <ManageTeamsContent />
        ) : (
          <ExploreContent />
        )}
      </div>
    </Wrapper>
  );
}
