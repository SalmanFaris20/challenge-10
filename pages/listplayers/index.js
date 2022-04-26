import React from "react";
import CardPlayers from "../../components/CardPlayers";
import Navbar from "../../components/Navbar";

export default function ListPlayers() {
  return (
    <div className="bg-utama h-screen">
      <Navbar />
      <CardPlayers />
    </div>
  );
}
