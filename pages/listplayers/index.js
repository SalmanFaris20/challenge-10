import React from "react";
import CardPlayers from "../../components/CardPlayers";
import Navbar from "../../components/Navbar";

export default function ListPlayers() {
  return (
    <div className="bg-utama pb-10 sm:pb-0 sm:h-screen">
      <Navbar />
      <CardPlayers />
    </div>
  );
}
