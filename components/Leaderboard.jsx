import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import men from "../images/male.png";
import women from "../images/female.png";
import Image from "next/image";
export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  const userCollectionRef = collection(db, "users");
  const q = query(userCollectionRef, orderBy("score.game1", "desc"));
  useEffect(() => {
    const getDataPlayer = async () => {
      const data = await getDocs(q);
      setPlayers(data.docs.map((doc) => ({ ...doc.data() })));
    };
    getDataPlayer();
  }, [userCollectionRef]);
  return (
    <div>
      <div class="overflow-x-auto w-full">
        <table class="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>

              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((item, index) => {
              return (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div class="flex items-center space-x-3">
                      <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
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
                        <div class="font-bold">{item.username}</div>
                        <div class="text-sm opacity-50">{item.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {item.email}
                    <br />
                    <span class="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span>
                  </td>

                  <th>
                    <button class="btn btn-ghost btn-xs">
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
