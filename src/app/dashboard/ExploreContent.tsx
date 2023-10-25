"use client";

import React, { useEffect, useState } from "react";
import CustomModal from "../components/modal/modal";
import axios from "axios";
import { useCookies } from "react-cookie";
import TeamCard from "../components/teams/team-card";

const ExploreContent = () => {
  const [cookie] = useCookies(["token"]);
  const [open, setOpen] = useState(false);
  const [confirmingModal, setConfirmingModal] = useState(false);
  const [data, setData] = useState([]);
  const [matchHistory, setMatchHistory] = useState([]);

  const getTeams = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/teams`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => setData(res.data.body))
      .catch((err) => console.error(err));
  };

  // const getDetails = async () => {
  //   await axios
  //           .get(
  //             `${process.env.NEXT_PUBLIC_API_URL}/matching/${res.data.body[0].id}`,
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${cookie.token}`,
  //               },
  //             }
  //           )
  //           .then((detailRes) => console.log(detailRes.data.body))
  // };

  const getMatchHistoryAndDetails = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/matchings`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => setMatchHistory(res.data.body))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTeams();
    getMatchHistoryAndDetails();
  }, []);

  const mock = [
    {
      id: 1,
      created_at: "2023-09-29T20:56:54.376Z",
      updated_at: "2023-09-29T21:42:42.345Z",
      deleted_at: null,
      miner: {
        id: 1,
      },
      looter: {
        id: 2,
      },
      winner: {
        id: 2,
      },
    },
  ];
  //TODO: Buranın Match History Entegrasyonuna Devam Edecegim!
  return (
    <div className="w-full py-4 flex flex-col gap-4">
      <div className="bg-dark_light w-full h-full rounded-lg text-dark overflow-auto font-semibold p-4">
        <div className="flex w-full px-10 justify-between items-center">
          <h1 className="font-extrabold text-2xl">Explore</h1>
          <button
            onClick={() => setOpen(true)}
            className="bg-heading py-2.5 px-3 rounded-lg hover:text-heading hover:bg-dark border-2 border-transparent hover:border-heading"
          >
            Start Mining Expedition
          </button>
          <CustomModal modalIsOpen={open} setModalIsOpen={setOpen}>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h1 className="font-black text-2xl text-center">Select Team</h1>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 fill-heading hover:fill-heading_dark duration-300 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="close"
                  >
                    <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                  </svg>
                </button>
              </div>
              <div className="h-full">
                {data.length ? (
                  data.map((team, index) => (
                    <TeamCard
                      disabled={true}
                      key={index}
                      team={team}
                      index={index}
                    />
                  ))
                ) : (
                  <h1 className="text-center opacity-50">Team Not Found</h1>
                )}
              </div>
              <div className="flex items-center justify-center text-dark">
                <button
                  onClick={() => {
                    setOpen(false);
                    setConfirmingModal(true);
                  }}
                  className="bg-heading py-2.5 px-3 rounded-lg hover:text-heading hover:bg-dark border-2 border-transparent hover:border-heading"
                >
                  Select
                </button>
              </div>
            </div>
          </CustomModal>
          <CustomModal
            modalIsOpen={confirmingModal}
            setModalIsOpen={setConfirmingModal}
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h1 className="font-black text-2xl text-center">Confirming</h1>
                <button
                  onClick={() => setConfirmingModal(false)}
                  className="w-8 h-8 fill-heading hover:fill-heading_dark duration-300 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="close"
                  >
                    <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                  </svg>
                </button>
              </div>
              <div className="h-full"></div>
            </div>
          </CustomModal>
        </div>
        <div className="w-full pt-4">
          {matchHistory.map((match, index) => (
            <TeamCard key={index} match={match} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreContent;
