import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailPlayer, logout } from "../redux/auth/authSlice";
import men from "../images/male.png";
import women from "../images/female.png";
import Image from "next/image";
import { PuzzleIcon } from "@heroicons/react/solid";

export default function Navbar() {
  const dispatch = useDispatch();

  const authenticatedUser = useSelector(
    (state) => state.auth.authenticatedUser
  );

  const handleLogOut = async () => {
    await dispatch(logout());
  };

  return (
    <div className="navbar bg-transparent font-utama px-5 border-b-slate-50 border-2 border-transparent">
      <div className="flex-1">
        <Link href={"/"} passHref>
          <a className="btn btn-link normal-case text-white text-xl hover:no-underline hover:text-second">
            <PuzzleIcon className="h-5 w-5 text-white mr-2" />
            Squid Game
          </a>
        </Link>
      </div>
      <div className="flex-1 space-x-5 text-white ">
        <Link href={"/games"} passHref>
          <a className="hover:border-b-indigo-500 hover:border-2 hover:border-transparent">
            Games
          </a>
        </Link>
        <Link href={"/listplayers"} passHref>
          <a className="hover:border-b-indigo-500 hover:border-2 hover:border-transparent">
            List Players
          </a>
        </Link>
      </div>
      {authenticatedUser ? (
        <div className="flex-none gap-1 text-white">
          <h5>{authenticatedUser.username}</h5>
          <div className="dropdown dropdown-end">
            <label
              tabIndex="0"
              className="btn btn-ghost btn-circle avatar flex gap-2"
            >
              <div className="w-10 rounded-full">
                {authenticatedUser && (
                  <>
                    {authenticatedUser.gender === "Men" && (
                      <Image
                        src={men}
                        height={500}
                        width={500}
                        alt="AvatarMen"
                      />
                    )}
                    {authenticatedUser.gender === "Women" && (
                      <Image
                        src={women}
                        height={500}
                        width={500}
                        alt="AvatarWomen"
                      />
                    )}
                  </>
                )}
              </div>
            </label>
            <ul
              tabIndex="0"
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={"/profile"} passHref>
                  <a className="justify-between">Profile</a>
                </Link>
              </li>

              <li onClick={handleLogOut}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-x-5">
          <Link href={"/login"} passHref>
            <a className="hover:border-b-indigo-500 hover:border-2 hover:border-transparent">
              Login
            </a>
          </Link>
          <Link href={"/register"} passHref>
            <a className="hover:border-b-indigo-500 hover:border-2 hover:border-transparent">
              Register
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}
