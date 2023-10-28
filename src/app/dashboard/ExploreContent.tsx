"use client";

import React, { useContext, useEffect, useState } from "react";
import CustomModal from "../components/modal/modal";
import axios from "axios";
import { useCookies } from "react-cookie";
import TeamCard from "../components/teams/team-card";
import Kilic from "@/assets/img/kilic.png";

const ExploreContent = () => {
  const [cookie] = useCookies(["token", "userID"]);
  const [open, setOpen] = useState(false);
  const [confirmingModal, setConfirmingModal] = useState(false);
  const [data, setData] = useState([]);
  const [matchHistory, setMatchHistory] = useState([]);

  const [details, setDetails] = useState([]);

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

  // const getMatchHistoryAndDetails = async () => {
  //   await axios
  //     .get(`${process.env.NEXT_PUBLIC_API_URL}/user/matchings`, {
  //       headers: {
  //         Authorization: `Bearer ${cookie.token}`,
  //       },
  //     })
  //     .then((res) => setMatchHistory(res.data.body))
  //     .catch((err) => console.error(err));
  // };

  const getMatchHistoryAndDetails = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/matchings`,
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      );

      const matchHistories = res.data.body;

      const detailedMatchHistories = await Promise.all(
        matchHistories.map(async (match) => {
          const detail = await getDetail(match.id);
          return {
            ...match,
            detail,
          };
        })
      );

      //@ts-ignore
      setMatchHistory(detailedMatchHistories);
    } catch (err) {
      console.error(err);
    }
  };

  const getDetail = async (id: number) => {
    try {
      const detailRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/matching/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      );
      return detailRes.data.body;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  console.log("matchHistory", matchHistory);

  useEffect(() => {
    getTeams();
    getMatchHistoryAndDetails();
  }, []);

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
          {matchHistory.map((match, index) => {
            //@ts-ignore
            const matchDetail = details[match.id];
            return (
              <div
                key={index}
                className="bg-dark_light_2 w-full p-4 rounded-lg relative flex"
              >
                <div
                  //@ts-ignore
                  className={`absolute h-12 w-12 -left-4 -top-4 rounded-lg flex items-center justify-center ${match.winner?.id == cookie.userID
                    ? "bg-green-400 rounded-full font-bold"
                    : "bg-red-400 rounded-full font-bold"
                    }`}
                >
                  <h1 className="text-center w-full text-sm font-bold text-dark">
                    {
                      //@ts-ignore
                      match.winner?.id == cookie.userID ? "Win" : "Lose"}
                  </h1>
                </div>
                {/* <div className="w-1/5 flex flex-col gap-4 mx-10 bg-dark_light p-4 rounded-lg">
                  <h1 className="text-xl font-bold">Gecmis Takim</h1>
                  <div className="flex">
                    <div className="w-1/2 flex flex-col gap-2">
                      <h1 className="text-lg font-semibold opacity-70">
                        Battle Points
                      </h1>
                      <h1 className="font-semibold text-yellow-500">0</h1>
                    </div>
                    <div className="w-1/2 flex flex-col gap-2">
                      <h1 className="text-lg font-semibold opacity-70">
                        Mine Points
                      </h1>
                      <h1 className="font-semibold text-yellow-500">1</h1>
                    </div>
                  </div>
                </div> */}
                <div className="w-full bg-dark_light grid grid-cols-3 grid-rows-1 rounded-2xl">
                  {
                    //@ts-ignore
                    match?.detail?.ducks?.map((duck: any, index: Key) => (
                      <div
                        key={index}
                        className="flex flex-col items-center justify-center bg-dark_light_2 rounded-lg m-2 transition-all duration-300 hover:brightness-90"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src={process.env.NEXT_PUBLIC_API_URL + duck.photo}
                            className="w-14 h-14"
                          />
                          <h1 className="font-bold text-sm">{duck.name}</h1>
                        </div>
                        <div className="flex gap-1 justify-center items-center">
                          <img src={Kilic.src} alt="kilic" className="w-8 h-8" />
                          <h1>{duck.base_power}</h1>
                        </div>
                      </div>
                    ))}

                  {/* {team?.ducks &&
                   Array(3 - team?.ducks.length)
                     .fill(null)
                     .map((_, idx) => (
                       <button
                         disabled={disabled}
                         onClick={() => setModalOpen(true)}
                         key={idx}
                         className="flex flex-col items-center justify-center bg-dark_light_2 rounded-lg m-2 transition-all duration-300 hover:brightness-90"
                       >
                         <h1 className="font-black text-4xl">?</h1>
                       </button>
                     ))} */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExploreContent;
