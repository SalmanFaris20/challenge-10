import React from "react";
import Image from "next/image";
import ListGameImg from "../../images/ListGame.jpg";
import CardGames from "../../components/CardGames";

export default function ListGames() {
  return (
    <div>
      <div>
        <Image src={ListGameImg} layout="fill" objectFit="cover" />
      </div>
      <div className="absolute inset-y-20 inset-x-28">
        <CardGames />
      </div>
    </div>
  );
}
