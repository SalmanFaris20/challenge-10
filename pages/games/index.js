import React from "react";
import { useSelector } from "react-redux";
import { ClimbingBoxLoader, ClipLoader } from "react-spinners";
import CardGames from "../../components/CardGames";
import Navbar from "../../components/Navbar";

export default function ListGames() {
  const games = useSelector((state) => state.games);
  return (
    <div className="bg-utama h-screen justify-center items-center">
      <Navbar />
      <div className="absolute top-1/2 right-1/2">
        {games.isListGamesLoading && (
          <ClimbingBoxLoader color={"#FFFFFF"} size={15} />
        )}
      </div>
      <div>
        <CardGames />
      </div>
    </div>
  );
}
