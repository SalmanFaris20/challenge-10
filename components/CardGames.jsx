import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import Link from "next/link";

export default function CardGames() {
  const [games, setGames] = useState([]);
  const userCollectionRef = collection(db, "games");
  useEffect(() => {
    const getDataGames = async () => {
      const data = await getDocs(userCollectionRef);
      setGames(data.docs.map((doc) => ({ ...doc.data() })));
    };

    getDataGames();
  }, []);
  return (
    <div className="flex flex-row gap-2">
      {games.map((item) => {
        return (
          <div className="card w-96 bg-base-100 shadow-xl" key={item.idgame}>
            <figure>
              <img src={item.img_url} alt="games" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {item.name}
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>{item.description}</p>
              <Link href={`/games/${item.idgame}`}>
                <div className="card-actions justify-end cursor-pointer">
                  <a className="badge badge-outline">Play</a>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
