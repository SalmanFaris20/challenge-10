import React, { useEffect, useState } from "react";
import refreshimg from "../images/refresh.svg";
import kertas from "../images/icon-paper.svg";
import batu from "../images/icon-rock.svg";
import gunting from "../images/icon-scissors.svg";
import Image from "next/image";
import { db, auth } from "../config/firebase";
import { getDoc, updateDoc, doc } from "firebase/firestore";

export default function Rock() {
  const [computer, setComputer] = useState("");
  const [score, setScore] = useState(0);
  const [choise, setChoise] = useState("");
  const [round, setRound] = useState(0);
  const [active, setActive] = useState(true);
  const [result, setResult] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setMyChoise = (value) => {
    setChoise(value);
    setRound(round + 1);
    computerRandom();
    if (round === 2) {
      setActive(false);
      setRefresh(true);
    }
  };

  const computerRandom = () => {
    const choises = ["rock", "paper", "scissor"];
    setComputer(choises[Math.floor(Math.random() * choises.length)]);
  };

  const handleRefresh = async () => {
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(userDoc);
    const currentScore = docSnap.data().score.game1;
    const newScore = currentScore + score;
    await updateDoc(userDoc, { "score.game1": newScore });
    await updateDoc(userDoc, { "gameplayed.game1": true });
    setChoise("");
    setScore(0);
    setRound(0);
    setActive(true);
    setComputer("");
    setResult("");
    setRefresh(false);
  };

  const Result = async () => {
    switch (choise + computer) {
      case "scissorpaper":
      case "rockscissor":
      case "paperrock":
        setResult("YOU WIN!");
        setScore(score + 1);
        break;
      case "paperscissor":
      case "scissorrock":
      case "rockpaper":
        setResult("YOU LOSE!");
        setScore(score - 1);
        break;
      case "paperpaper":
      case "scissorscissor":
      case "rockrock":
        setResult("DRAW");
        break;
    }
  };

  useEffect(() => {
    Result();
  }, [computer, choise]);

  return (
    <div className="flex flex-col justify-center gap-5 ">
      <div className="flex justify-between px-0 py-5 items-center ">
        <div className="absolute top-10 left-10 flex flex-col w-28 h-28 justify-center border border-solid border-r-2 border-blue-500 bg-white">
          <h5>You Pick</h5>
          {choise === "paper" && (
            <div className="bg-white border-solid border-2 w-9 h-9 border-blue-600 rounded-full flex justify-center items-center">
              <Image src={kertas} alt="kertas" />
            </div>
          )}
          {choise === "rock" && (
            <div className="bg-white border-solid border-2 border-blue-600 rounded-full flex justify-center items-center">
              <Image src={batu} alt="batu" />
            </div>
          )}
          {choise === "scissor" && (
            <div className="bg-white border-solid border-2 border-blue-600 rounded-full flex justify-center items-center">
              <Image src={gunting} alt="gunting" />
            </div>
          )}
        </div>
        <div className="absolute top-10 right-10 flex flex-col w-28 h-28 justify-center  border border-solid border-r-2 border-blue-500 bg-white">
          <h5>Computer Pick</h5>
          <div>
            {computer === "paper" && (
              <div className="bg-white border-solid border-2 border-blue-600 rounded-full flex justify-center items-center">
                <Image src={kertas} alt="kertas" />
              </div>
            )}
            {computer === "rock" && (
              <div className="bg-white border-solid border-2 border-blue-600 rounded-full flex justify-center items-center">
                <Image src={batu} alt="batu" />
              </div>
            )}
            {computer === "scissor" && (
              <div className="bg-white border-solid border-2 border-blue-600 rounded-full flex justify-center items-center">
                <Image src={gunting} alt="gunting" />
              </div>
            )}
          </div>
        </div>
      </div>
      {refresh && (
        <div
          onClick={() => handleRefresh()}
          className="absolute top-1/2 right-1/2"
        >
          <Image src={refreshimg} alt="refresh" />
        </div>
      )}

      <div className="absolute top-1 left-1/2 right-1/2 flex flex-col justify-center items-center">
        <h1 className="text-white text-3xl">{result}</h1>
        <div className="flex gap-2 justify-center items-center mt-5">
          <div className="bg-white p-10 h-40 flex flex-col justify-center items-center text-3xl rounded-3xl">
            <span>Round</span>
            <span>{round}</span>
          </div>
          <div className="bg-white p-10 h-40 flex flex-col justify-center items-center text-3xl rounded-3xl">
            <span>Score</span>
            <span>{score}</span>{" "}
          </div>
        </div>
      </div>
      <div className="absolute left-5 bottom-0 text-white border-2 border-solid border-white px-4 py-8 rounded-md">
        {active ? (
          <div className="flex gap-8">
            <div
              onClick={() => setMyChoise("paper")}
              className="bg-white border-8 border-solid border-blue-500 w-32 rounded-full h-32 flex justify-center items-center"
            >
              <Image src={kertas} alt="kertas" />
            </div>

            <div
              onClick={() => setMyChoise("rock")}
              className="bg-white border-8 border-solid border-blue-500 w-32 rounded-full h-32 flex justify-center items-center"
            >
              <Image src={batu} alt="batu" />
            </div>

            <div
              onClick={() => setMyChoise("scissor")}
              className="bg-white border-8 border-solid border-blue-500 w-32 rounded-full h-32 flex justify-center items-center"
            >
              <Image src={gunting} alt="gunting" />
            </div>
          </div>
        ) : (
          <div className="cursor-not-allowed flex gap-8">
            <div
              data-id="paper"
              className="bg-white border-8 border-solid border-blue-500 w-32 rounded-full h-32 flex justify-center items-center"
            >
              <Image src={kertas} alt="kertas" />
            </div>

            <div
              data-id="paper"
              className="bg-white border-8 border-solid border-blue-500 w-32 rounded-full h-32 flex justify-center items-center"
            >
              <Image src={batu} alt="batu" />
            </div>

            <div
              data-id="paper"
              className="bg-white border-8 border-solid border-blue-500 w-32 rounded-full h-32 flex justify-center items-center"
            >
              <Image src={gunting} alt="gunting" />
            </div>
          </div>
        )}
      </div>
      <label
        htmlFor="my-modal-6"
        onClick={handleOpen}
        className="btn modal-button absolute right-5 bottom-0 text-white border-solid border-2 border-white rounded-md"
      >
        Rules Games
      </label>
      {open && (
        <>
          <input type="checkbox" id="my-modal-6" class="modal-toggle"></input>
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">RULES THE GAMES!</h3>
              <p className="py-1">1. Permainan berlangsung dalam 3 ronde</p>
              <p className="py-1">2. Jika menang mendapatkan 1 poin</p>
              <p className="py-1">3. Jika kalah kehilangan 1 poin</p>
              <p className="py-1">
                4. Jika permainan telah selesai, klik refresh untuk mendapatkan
                score di leaderboard dan mulai game kembali
              </p>
              <div className="modal-action">
                <label for="my-modal-6" class="btn">
                  Yay!
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
