import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import men from "../images/male.png";
import women from "../images/female.png";
import Image from "next/image";

export default function Navbar() {
  const dispatch = useDispatch();

  const authenticatedUser = useSelector(
    (state) => state.auth.authenticatedUser
  );

  const handleLogOut = async () => {
    await dispatch(logout());
  };

  return (
    <div className="navbar bg-transparent font-utama px-5">
      <div className="flex-1">
        <Link href={"/"} passHref>
          <a className="btn btn-link normal-case text-white text-xl">
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
        <a className="hover:border-b-indigo-500 hover:border-2 hover:border-transparent">
          List Player
        </a>
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
            <a>Login</a>
          </Link>
          <Link href={"/register"} passHref>
            <a>Register</a>
          </Link>
        </div>
      )}
    </div>
  );
}
