"use client";

import React, { useContext, useEffect, useState } from "react";
import CustomModal from "../components/modal/modal";
import axios from "axios";
import { useCookies } from "react-cookie";
import TeamCard from "../components/teams/team-card";
import Kilic from "@/assets/img/kilic.png";
import { HashLoader } from "react-spinners";

const ExploreContent = () => {
  const [cookie] = useCookies(["token", "userID"]);
  const [open, setOpen] = useState(false);
  const [confirmingModal, setConfirmingModal] = useState(false);
  const [data, setData] = useState([]);
  const [matchHistory, setMatchHistory] = useState([]);
  const [searchMatch, setSearchMatch] = useState(false);

  const [details, setDetails] = useState([]);
  const [currentMatch, setCurrentMatch] = useState({});
  const [selectedType, setSelectedType] = useState("");
  const [waitingTeam, setWaitingTeam] = useState("");

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

  const [selectedTeamID, setSelectedTeamID] = useState();
  const [matchStarterLoader, setMatchStarterLoader] = useState(false);
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

  const getCurrentMatch = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/matching`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        setCurrentMatch(res.data.body);
        if (res.data.body && res.data.body.created_at) {
          // @ts-ignore
          setWaitingTeam(null);
          setSearchMatch(false);
          const createdDate = new Date(res.data.body.created_at);
          const modifiedDate = createdDate.getTime() + 3 * 60 * 60 * 1000; // 3 saat ekleniyor
          const endDate = new Date(modifiedDate + 2 * 60 * 1000); // 2 dakika ekleniyor

          // End tarihini localStorage'a kaydet
          localStorage.setItem("endDate", endDate.toISOString());

          // Kalan süreyi hesapla ve ayarla
          // @ts-ignore
          setTimeLeft(endDate - new Date());
        }
      })
      .catch((err) => console.error(err));
  };

  const handleStartGame = async () => {
    setMatchStarterLoader(true);
    if (!selectedTeamID || !selectedType) return;

    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/matching`,
        {
          matching: selectedType === "Miner" ? 2 : 1,
          id: selectedTeamID,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
      .then((res) => console.log(res.data.body))
      .catch((err) => console.error(err));
  };

  const waitingForMatch = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        if (res.data.body.matchingTeam) {
          setSearchMatch(true);
          setWaitingTeam(res.data.body.matchingTeam);
        } else {
          setSearchMatch(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleExitGame = async () => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/matching`,
        {
          matching: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
      .then((res) => {
        waitingForMatch();
        // @ts-ignore
        setSelectedTeamID(null);
        // @ts-ignore
        setSelectedType(null);
      })
      .catch((err) => console.error(err));
  };

  const [timeLeft, setTimeLeft] = useState();

  function calculateTimeLeft() {
    // @ts-ignore
    let endTime = new Date(localStorage.getItem("endDate")).getTime();
    let now = new Date().getTime();
    let distance = endTime - now;

    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    console.log(minutes, seconds);
    if (minutes == 0 && seconds == 0) {
      localStorage.removeItem("endDate");
      // @ts-ignore
      setCurrentMatch(null);
      setTimeout(() => {
        getCurrentMatch();
      }, 1000);
    }
    return { minutes, seconds };
  }

  useEffect(() => {
    if (!currentMatch) {
      return; // currentMatch null veya undefined ise hiçbir şey yapma
    }

    const timer = setInterval(() => {
      // @ts-ignore
      setTimeLeft(calculateTimeLeft());
      // @ts-ignore
      if (timeLeft?.minutes === 0 && timeLeft?.seconds === 0) {
        localStorage.removeItem("endDate");
        // @ts-ignore
        setCurrentMatch(null);
        setSearchMatch(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentMatch]);

  useEffect(() => {
    getTeams();
    getMatchHistoryAndDetails();
    getCurrentMatch();
    waitingForMatch();
  }, []);

  const buttonData = ["Miner", "Looter"];

  return (
    <div className="w-full py-4 flex flex-col gap-4">
      <div className="bg-dark_light w-full h-full rounded-lg text-dark overflow-auto font-semibold p-4 flex flex-col gap-2">
        <div className="flex w-full px-10 justify-between items-center">
          <h1 className="font-extrabold text-2xl">Explore</h1>

          <button
            onClick={() => setOpen(true)}
            className="bg-heading py-2.5 px-3 rounded-lg hover:text-heading hover:bg-dark border-2 border-transparent hover:border-heading"
          >
            Start Mining Expedition
          </button>
          <CustomModal
            width="46%"
            height="48%"
            modalIsOpen={open}
            setModalIsOpen={setOpen}
          >
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
              <div className="h-full w-full">
                {data.length ? (
                  data.map((team, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        // @ts-ignore
                        if (selectedTeamID === team.id) {
                          // @ts-ignore
                          setSelectedTeamID(null);
                        } else {
                          // @ts-ignore
                          setSelectedTeamID(team.id);
                        }
                      }}
                      className={`border-2 rounded-lg w-full ${
                        // @ts-ignore
                        selectedTeamID === team.id
                          ? "border-heading"
                          : "border-transparent"
                      } `}
                    >
                      <TeamCard
                        disabled={true}
                        key={index}
                        team={team}
                        index={index}
                      />
                    </button>
                  ))
                ) : (
                  <h1 className="text-center opacity-50">Team Not Found</h1>
                )}
              </div>
              <div className="w-1/3 flex mx-auto justify-between items-center gap-4">
                {buttonData.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (selectedType === item) {
                        // @ts-ignore
                        setSelectedType(null);
                      } else {
                        setSelectedType(item);
                      }
                    }}
                    className={`${
                      selectedType === item ? "btn-selected" : "btn"
                    }`}
                    // className="w-full h-[10%] bg-heading text-dark rounded-lg font-semibold transition-all duration-300 hover:opacity-70"
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-center text-dark">
                <button
                  disabled={!selectedTeamID || !selectedType}
                  onClick={() => {
                    handleStartGame();
                    setTimeout(() => {
                      waitingForMatch();
                      setMatchStarterLoader(false);
                      setOpen(false);
                    }, 2000);
                  }}
                  className="bg-heading py-2.5 px-3 disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-800 disabled:cursor-not-allowed rounded-lg hover:text-heading hover:bg-dark border-2 border-transparent hover:border-heading"
                >
                  {matchStarterLoader ? (
                    <HashLoader size={20} color="#FFFFFF" />
                  ) : (
                    "Start"
                  )}
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
        {currentMatch ? (
          <div className="w-full flex flex-col gap-2">
            <h1>Current Matching</h1>
            <div className="bg-dark_light_2 h-16 rounded-lg flex items-center px-10 justify-between">
              <h1 className="text-lg">
                {
                  // @ts-ignore
                  timeLeft?.minutes !== undefined &&
                    // @ts-ignore
                    timeLeft?.seconds !== undefined &&
                    // @ts-ignore
                    `${String(timeLeft?.minutes).padStart(2, "0")}:${String(
                      // @ts-ignore
                      timeLeft?.seconds
                    ).padStart(2, "0")}`
                }
              </h1>
              <div className="grid grid-cols-3 gap-4 w-2/3 h-12">
                <div className="bg-dark_light rounded-lg transition-colors duration-300 hover:bg-dark hover:cursor-pointer" />
                <div className="bg-dark_light rounded-lg transition-colors duration-300 hover:bg-dark hover:cursor-pointer" />
                <div className="bg-dark_light rounded-lg transition-colors duration-300 hover:bg-dark hover:cursor-pointer" />
              </div>
            </div>
          </div>
        ) : searchMatch ? (
          <div className="bg-dark_light_2 w-full pl-32 flex justify-between rounded-lg p-4 relative">
            <div
              //@ts-ignore
              className={`absolute h-12 w-12 -left-4 -top-4 rounded-lg flex items-center justify-center bg-yellow-600 `}
            >
              <h1 className="text-center w-full text-sm font-bold text-dark">
                Waiting
              </h1>
            </div>
            {
              //@ts-ignore
              <h1 className="text-white ml-10">{waitingTeam.name}</h1>
            }
            <button
              onClick={() => handleExitGame()}
              className="text-red-400 hover:text-red-500 transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="h-0.5 w-full bg-white opacity-50 rounded-lg" />
        <div className="w-full pt-4 flex flex-col gap-4">
          <h1>Match History</h1>
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
                  className={`absolute h-12 w-12 -left-4 -top-4 rounded-lg flex items-center justify-center ${
                    // @ts-ignore
                    match.winner?.id == cookie.userID
                      ? "bg-green-400 rounded-full font-bold"
                      : "bg-red-400 rounded-full font-bold"
                  }`}
                >
                  <h1 className="text-center w-full text-sm font-bold text-dark">
                    {
                      //@ts-ignore
                      match.winner?.id == cookie.userID ? "Win" : "Lose"
                    }
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
                          <img
                            src={Kilic.src}
                            alt="kilic"
                            className="w-8 h-8"
                          />
                          <h1>{duck.base_power}</h1>
                        </div>
                      </div>
                    ))
                  }

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
