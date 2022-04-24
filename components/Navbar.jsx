import React from "react";

export default function Navbar() {
  return (
    <div>
      <div className="navbar bg-transparent font-utama px-5">
        <div className="flex-1">
          <a className="btn btn-link normal-case text-white text-xl">
            Squid Game
          </a>
        </div>
        <div className="flex-1 space-x-5 text-white">
          <a href="">Games</a>
          <a href="">List Player</a>
        </div>
        <div className="space-x-5">
          <a href="">Login</a>
          <a href="">Register</a>
        </div>
        {/* <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://api.lorem.space/image/face?hash=33791" />
              </div>
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
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
}
