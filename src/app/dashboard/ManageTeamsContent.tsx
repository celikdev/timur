"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import TeamCard from "../components/teams/team-card";

const ManageTeamsContent = () => {
  const [cookie] = useCookies(["token"]);
  const [data, setData] = useState([]);
  const [refreshState, setRefreshState] = useState(false);

  const getTeams = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/teams`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => setData(res.data.body))
      .catch((err) => console.error(err))
      .finally(() => setRefreshState(false));
  };

  useEffect(() => {
    getTeams();
  }, [refreshState === true]);

  return (
    <div className="w-full py-4 flex flex-col gap-4">
      <div className="bg-dark_light w-full h-full rounded-lg text-dark font-semibold p-4 flex flex-col gap-4">
        <span className="flex items-center gap-2">
          <h1 className="font-extrabold text-2xl">Team</h1>
          <h1 className="font-semibold text-lg mt-0.5">
            {"(" + data.length.toString() + " / 3)"}
          </h1>
        </span>

        {data.length ? (
          data.map((team, index) => (
            <TeamCard
              key={index}
              team={team}
              index={index}
              refreshState={refreshState}
              setRefreshState={setRefreshState}
            />
          ))
        ) : (
          <h1 className="text-center opacity-50">Team Not Found</h1>
        )}
      </div>
    </div>
  );
};

export default ManageTeamsContent;
