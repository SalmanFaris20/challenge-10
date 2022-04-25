import React, { useState } from "react";
import refreshimg from "../images/refresh.svg";
import Image from "next/image";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export default function Random() {
  const [result, setResult] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [round, setRound] = useState(0);
  const [active, setActive] = useState(true);

  const handleRefresh = async () => {
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(userDoc);
    const currentScore = docSnap.data().score.game2;
    const newScore = currentScore + result;
    await updateDoc(userDoc, { "score.game2": newScore });
    await updateDoc(userDoc, { "gameplayed.game2": true });
    setResult(0);
    setRefresh(false);
    setActive(true);
    setRound(0);
  };

  const randomClick = () => {
    setResult(Math.floor(Math.random() * 10));

    setRound(round + 1);
    if (round === 2) {
      setActive(false);
      setRefresh(true);
      setRefresh(true);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-10">
      {refresh && (
        <div onClick={() => handleRefresh()}>
          <Image src={refreshimg} alt="refresh" />
        </div>
      )}
      <div className="text-3xl text-white">{result}</div>
      {active ? (
        <button onClick={randomClick} className="btn btn-primary">
          Play
        </button>
      ) : (
        <button className="btn btn-primary cursor-not-allowed">Play</button>
      )}
    </div>
  );
}
