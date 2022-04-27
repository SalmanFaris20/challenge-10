import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import men from "../../images/male.png";
import women from "../../images/female.png";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import { editAuth, updateCredentials } from "../../redux/auth/authSlice";
import { XIcon } from "@heroicons/react/solid";
import { ClockLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const updateauth = useSelector((state) => state.auth);
  const authenticatedUser = useSelector(
    (state) => state.auth.authenticatedUser
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(editAuth(updateauth.form)).then(() => {
      setOpen(false);
      window.location.reload(false);
    });
  };

  const handleChange = (event) => {
    dispatch(
      updateCredentials({
        name: event.target.name,
        value: event.target.value,
      })
    );
  };
  return (
    <div className="h-screen bg-utama">
      <Navbar />
      <ToastContainer />
      {updateauth.isFetchDataPlayerLoading ? (
        <div className="absolute top-1/2 right-1/2">
          <ClockLoader color={"#FFFFFF"} size={50} />
        </div>
      ) : (
        <div className="flex gap-10 justify-center items-center h-screen font-utama">
          {authenticatedUser && (
            <div className="flex gap-20">
              <div>
                <div className="avatar">
                  <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ">
                    <Image
                      src={authenticatedUser.gender === "Men" ? men : women}
                      height={500}
                      width={500}
                      alt="AvatarMen"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <div>Username : {authenticatedUser.username}</div>
                  <div>Email : {authenticatedUser.email}</div>
                  <div>Gender : {authenticatedUser.gender}</div>
                </div>
                <label
                  htmlFor="my-modal-6"
                  onClick={handleOpen}
                  className="btn modal-button text-white border-solid border-2 border-white rounded-md"
                >
                  Edit Profile
                </label>
              </div>
            </div>
          )}

          {open && (
            <>
              <input
                type="checkbox"
                id="my-modal-6"
                className="modal-toggle"
              ></input>
              <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg">Edit Profile</h3>
                    <XIcon className="h-5 w-5" onClick={handleClose} />
                  </div>
                  {authenticatedUser && (
                    <>
                      <div className="form-control w-full max-w-xs">
                        <label className="label">
                          <span className="label-text">Username</span>
                        </label>
                        <input
                          type="text"
                          name="username"
                          defaultValue={authenticatedUser.username}
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-control w-full max-w-xs">
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <input
                          type="text"
                          name="email"
                          defaultValue={authenticatedUser.email}
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-control w-full max-w-xs">
                        <label className="label">
                          <span className="label-text">Gender</span>
                        </label>
                        <select
                          className="select select-bordered"
                          name="gender"
                          onChange={handleChange}
                          defaultValue={authenticatedUser.gender}
                        >
                          <option disabled>Pick one</option>
                          <option value={"Men"}>Men</option>
                          <option value={"Women"}>Women</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div className="modal-action">
                    {updateauth.isEditLoading ? (
                      <button
                        htmlFor="my-modal-6"
                        className="btn loading"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Send
                      </button>
                    ) : (
                      <button
                        htmlFor="my-modal-6"
                        className="btn"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Send
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
