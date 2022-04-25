import React from "react";
import Image from "next/image";
import ImgLogin from "../../images/login.png";
import Cardlogin from "../../components/Cardlogin";
import AuthMiddleware from "../../middlewares/authMiddleware";

export default function Login() {
  return (
    <AuthMiddleware>
      <div className="grid grid-cols-2 bg-white h-screen">
        <div className="h-9 w-full">
          <Image src={ImgLogin} layout="fill" objectFit="cover" />
        </div>
        <div className="absolute inset-y-1/4 inset-x-28 ">
          <Cardlogin />
        </div>
      </div>
    </AuthMiddleware>
  );
}
