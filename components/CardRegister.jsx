import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthMiddleware from "../middlewares/authMiddleware";
import { registerAuth, updateCredentials } from "../redux/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CardRegister() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const autth = auth.isRegisterLoading;
  console.log(autth);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(registerAuth(auth.form)).then((response) => {
      if (response.error) {
        toast.error("error", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const onInputChange = (event) => {
    dispatch(
      updateCredentials({
        name: event.target.name,
        value: event.target.value,
      })
    );
  };

  return (
    <AuthMiddleware>
      <ToastContainer />
      <div className="card w-96 glass">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="card-title">Register</h2>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              onChange={onInputChange}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={onInputChange}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              className="select select-bordered"
              name="gender"
              onChange={onInputChange}
            >
              <option disabled selected defaultValue={"Men"}>
                Pick one
              </option>
              <option value={"Men"}>Men</option>
              <option value={"Women"}>Women</option>
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              onChange={onInputChange}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmpassword"
              onChange={onInputChange}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="card-actions justify-center">
            {auth.isRegisterLoading ? (
              <button className="btn loading">Register</button>
            ) : (
              <button className="btn btn-primary" type="submit">
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </AuthMiddleware>
  );
}
