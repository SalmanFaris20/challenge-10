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
    <div className="navbar bg-utama font-utama px-5 border-b-slate-50 border-2 border-transparent">
      <div className="flex-1">
        <Link href={"/"} passHref>
          <a className="btn btn-link normal-case text-white text-xl hover:no-underline hover:text-second">
            <PuzzleIcon className="h-5 w-5 text-white mr-2 mt-2 sm:mt-0" />
            <h5 className="invisible sm:visible">Close Mount</h5>
          </a>
        </Link>
      </div>
      <div className="invisible sm:visible flex-1 space-x-5 text-white ">
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
        <div className="flex-none invisible sm:visible gap-1 text-white">
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
        <div className="space-x-5 invisible sm:visible">
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
      <div className="absolute top-2 right-8">
        <label className="btn btn-circle swap swap-rotate sm:hidden">
          <input type="checkbox" />
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>
    </div>
  );
}
