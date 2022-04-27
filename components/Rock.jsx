import React, { useEffect, useState } from "react";
import kertas from "../images/icon-paper.svg";
import batu from "../images/icon-rock.svg";
import gunting from "../images/icon-scissors.svg";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { updateScore } from "../redux/games/gamesSlice";

export default function Rock() {
  const dispatch = useDispatch();
  const [computer, setComputer] = useState("");
  const [score, setScore] = useState(0);
  const [choise, setChoise] = useState("");
  const [round, setRound] = useState(0);
  const [active, setActive] = useState(true);
  const [result, setResult] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

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
    dispatch(
      updateScore({
        score,
      })
    );
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
    <div className="flex flex-col justify-center gap-5 h-screen">
      <div className="flex justify-between px-0 py-5 items-center ">
        <div className="flex flex-col items-center justify-center absolute top-1/3 left-10 space-y-2">
          <h5>Your Pick</h5>
          <div className="flex flex-col w-28 h-28 justify-center items-center border-solid border-8 border-blue-500 bg-white rounded-full">
            {choise === "paper" && (
              <div className="w-9 h-9 rounded-full flex justify-center items-center">
                <Image src={kertas} alt="kertas" />
              </div>
            )}
            {choise === "rock" && (
              <div className="w-9 h-9 rounded-full flex justify-center items-center">
                <Image src={batu} alt="batu" />
              </div>
            )}
            {choise === "scissor" && (
              <div className="w-9 h-9 rounded-full flex justify-center items-center">
                <Image src={gunting} alt="gunting" />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center absolute top-1/3 right-10 space-y-2">
          <h5>Computer Pick</h5>
          <div className="flex flex-col w-28 h-28 justify-center items-center border-solid border-8 border-red-500 bg-white rounded-full">
            {computer === "paper" && (
              <div className="w-9 h-9 rounded-full flex justify-center items-center">
                <Image src={kertas} alt="kertas" />
              </div>
            )}
            {computer === "rock" && (
              <div className="w-9 h-9 rounded-full flex justify-center items-center">
                <Image src={batu} alt="batu" />
              </div>
            )}
            {computer === "scissor" && (
              <div className="w-9 h-9 rounded-full flex justify-center items-center">
                <Image src={gunting} alt="gunting" />
              </div>
            )}
          </div>
        </div>
      </div>
      {refresh && (
        <div
          onClick={() => handleRefresh()}
          className="absolute top-1/4 right-1/2 left-1/2 justify-center flex"
        >
          <div className="justify-center bg-slate-400 w-96 flex">
            <button className="btn btn-secondary">Play Again</button>
          </div>
        </div>
      )}

      <div className="absolute top-1/3 left-1/2 right-1/2 flex flex-col justify-center items-center font-utama">
        <div>
          <h1 className="text-white text-6xl font-bold w-96 flex  justify-center">
            {result}
          </h1>
        </div>
        <div className="flex gap-2 justify-center items-center mt-5">
          <div className="bg-white border-8 border-blue-500 border-solid px-10 py-2 h-40 flex flex-col items-center justify-around text-3xl rounded-3xl">
            <span className="text-lg">ROUND</span>
            <span className="font-bold text-6xl">{round}</span>
          </div>
          <div className="bg-white border-8 border-blue-500 border-solid px-10 py-2 h-40 flex flex-col items-center justify-around text-3xl rounded-3xl">
            <span className="text-lg">SCORE</span>
            <span className="font-bold text-6xl">{score}</span>
          </div>
        </div>
      </div>
      <div className="absolute left-8 bottom-5 text-white border-2 border-solid border-white px-2 py-4 rounded-md">
        {active ? (
          <div className="flex gap-8">
            <div
              onClick={() => setMyChoise("paper")}
              className="bg-white border-8 border-solid border-blue-500 w-28 rounded-full h-28 flex justify-center items-center"
            >
              <Image src={kertas} alt="kertas" />
            </div>

            <div
              onClick={() => setMyChoise("rock")}
              className="bg-white border-8 border-solid border-blue-500 w-28 rounded-full h-28 flex justify-center items-center"
            >
              <Image src={batu} alt="batu" />
            </div>

            <div
              onClick={() => setMyChoise("scissor")}
              className="bg-white border-8 border-solid border-blue-500 w-28 rounded-full h-28 flex justify-center items-center"
            >
              <Image src={gunting} alt="gunting" />
            </div>
          </div>
        ) : (
          <div className="cursor-not-allowed flex gap-8">
            <div
              data-id="paper"
              className="bg-white border-8 border-solid border-blue-500 w-28 rounded-full h-28 flex justify-center items-center"
            >
              <Image src={kertas} alt="kertas" />
            </div>

            <div
              data-id="paper"
              className="bg-white border-8 border-solid border-blue-500 w-28 rounded-full h-28 flex justify-center items-center"
            >
              <Image src={batu} alt="batu" />
            </div>

            <div
              data-id="paper"
              className="bg-white border-8 border-solid border-blue-500 w-28 rounded-full h-28 flex justify-center items-center"
            >
              <Image src={gunting} alt="gunting" />
            </div>
          </div>
        )}
      </div>
      <label
        htmlFor="my-modal-6"
        onClick={handleOpen}
        className="btn modal-button absolute right-8 bottom-5 text-white border-solid border-2 border-white rounded-md"
      >
        Rules Games
      </label>
      {open && (
        <>
          <input
            type="checkbox"
            id="my-modal-6"
            className="modal-toggle"
          ></input>
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
                <label htmlFor="my-modal-6" className="btn">
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
