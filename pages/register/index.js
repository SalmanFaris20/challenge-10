import React from "react";
import Image from "next/image";
import ImgRegister from "../../images/register.svg";
import AuthMiddleware from "../../middlewares/authMiddleware";
import CardRegister from "../../components/CardRegister";

export default function Register() {
  return (
    <AuthMiddleware>
      <div className="h-screen bg-white">
        <div>
          <Image src={ImgRegister} layout="fill" objectFit="cover" />
        </div>
        <div className="absolute top-8 left-5 sm:left-28 md:left-1 lg:left-14 xl:left-28 2xl:left-40">
          <CardRegister />
        </div>
      </div>
    </AuthMiddleware>
  );
}
