import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const authenticatedUser = useSelector(
    (state) => state.auth.authenticatedUser
  );

  const handleLogOut = async () => {
    await dispatch(logout());
  };

  return (
    <div>
      <div className="navbar bg-transparent font-utama px-5">
        <div className="flex-1">
          <a className="btn btn-link normal-case text-white text-xl">
            Squid Game
          </a>
        </div>
        <div className="flex-1 space-x-5 text-white">
          <Link href={"/games"} passHref>
            <a href="">Games</a>
          </Link>
          <a>List Player</a>
        </div>
        {authenticatedUser ? (
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://api.lorem.space/image/face?hash=33791" />
                </div>
                <h5>{authenticatedUser.username}</h5>
              </label>

              <ul
                tabIndex="0"
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <h5></h5>
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
    </div>
  );
}
