import React from "react";
import Image from "next/image";
import GamesImg from "../../../images/games.jpg";
import { useRouter } from "next/router";
import Rock from "../../../components/Rock";
import Random from "../../../components/Random";

export default function UserSingle() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <div>
      {id == 1 ? (
        <div>
          <div>
            <Image src={GamesImg} layout="fill" objectFit="cover" />
          </div>
          <div className="absolute inset-y-28 inset-x-10">
            <Rock />
          </div>
        </div>
      ) : (
        <div>
          <div>
            {/* <Image src={GamesImg} layout="fill" objectFit="cover" /> */}
          </div>
          <div className="absolute left-1/2">
            <Random />
          </div>
        </div>
      )}
    </div>
  );
}
