import React from "react";
import { useRouter } from "next/router";
import Rock from "../../../components/Rock";
import Random from "../../../components/Random";
import Leaderboard from "../../../components/Leaderboard";
import Navbar from "../../../components/Navbar";
import Leaderboard2 from "../../../components/Leaderboard2";
import LogoutMiddleware from "../../../middlewares/LogoutMiddleware";

export default function UserSingle() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <LogoutMiddleware>
      {id == 1 ? (
        <div className="bg-utama">
          <Navbar />
          <div className="mt-52 flex flex-col">
            <Rock />
            <Leaderboard />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col px-10 bg-utama">
            <Random />
            <Leaderboard2 />
          </div>
        </div>
      )}
    </LogoutMiddleware>
  );
}
