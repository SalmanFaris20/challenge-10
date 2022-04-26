import React, { useEffect } from "react";
import men from "../images/male.png";
import women from "../images/female.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboard } from "../redux/games/gamesSlice";
import { ClimbingBoxLoader } from "react-spinners";

export default function Leaderboard() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);
  const loadPosts = async () => {
    try {
      const response = await dispatch(fetchLeaderboard()).unwrap();
      console.log("ini response", response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);
  return (
    <div>
      <div className="overflow-x-auto w-full px-10 py-10">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {games.isLeadeLoading && (
              <div className="absolute top-1/2 right-1/2">
                <ClimbingBoxLoader color={"#FFFFFF"} size={15} />
              </div>
            )}
            {games.dataLead.map((item, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          {item.gender === "Men" && (
                            <Image
                              src={men}
                              height={500}
                              width={500}
                              alt="Avatar Tailwind CSS Component"
                            />
                          )}
                          {item.gender === "Women" && (
                            <Image
                              src={women}
                              height={500}
                              width={500}
                              alt="Avatar Tailwind CSS Component"
                            />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.username}</div>
                        <div className="text-sm opacity-50">{item.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {item.email}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span>
                  </td>

                  <th>
                    <button className="btn btn-ghost btn-xs">
                      {item.score.game1}
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
