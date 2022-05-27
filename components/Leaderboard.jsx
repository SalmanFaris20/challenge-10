/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import men from '../images/male.png';
import women from '../images/female.png';

import { db } from '../config/firebase';

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  const userCollectionRef = collection(db, 'users');
  const q = query(userCollectionRef, orderBy('score.game1', 'desc'));
  useEffect(() => {
    const getDataPlayer = async () => {
      const data = await getDocs(q);
      setPlayers(data.docs.map((doc) => ({ ...doc.data() })));
    };
    getDataPlayer();
  }, [userCollectionRef]);
  return (
    <div>
      <div className="overflow-x-auto w-full px-10 py-10">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th className="hidden md:block">Email</th>

              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((item, index) => {
              return (
                <tr key={item.uid}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          {item.gender === 'Men' && (
                            <Image
                              src={men}
                              height={500}
                              width={500}
                              alt="Avatar Tailwind CSS Component"
                            />
                          )}
                          {item.gender === 'Women' && (
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

                  <td className="hidden md:block">{item.email}</td>
                  <td className="hidden md:block italic">
                    {item.gameplayed.game1 === true && <h5>was played</h5>}
                    {item.gameplayed.game1 === false && <h5>not played</h5>}
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs" type="button">
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
