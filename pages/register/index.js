import React from "react";
import Image from "next/image";
import ImgRegister from "../../images/register.jpg";
import AuthMiddleware from "../../middlewares/authMiddleware";
import CardRegister from "../../components/CardRegister";

export default function Login() {
  return (
    <AuthMiddleware>
      <div className="h-screen">
        <div className="h-9 w-full">
          <Image src={ImgRegister} layout="fill" objectFit="cover" />
        </div>
        <div className="absolute inset-y-20 inset-x-28 ">
          <CardRegister />
        </div>
      </div>
    </AuthMiddleware>
  );
}
