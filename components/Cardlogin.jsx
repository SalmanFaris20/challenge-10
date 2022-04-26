import { useDispatch, useSelector } from "react-redux";
import { loginAuth, updateCredentials } from "../redux/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Cardlogin() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const onInputChange = (event) => {
    dispatch(
      updateCredentials({
        name: event.target.name,
        value: event.target.value,
      })
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dispatch(loginAuth(auth.form)).then((response) => {
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

  return (
    <div>
      <ToastContainer />
      <div className="card w-96 glass">
        <form className="card-body" onSubmit={onSubmit}>
          <h2 className="card-title">Login</h2>
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
          <div className="flex justify-end">
            <h5 className="text-white font-light">
              not have an account?{" "}
              <Link href={"/register"} passHref>
                <a className="text-second font-bold">Sign Up</a>
              </Link>
            </h5>
          </div>
          <div className="card-actions justify-center">
            {auth.isLoginLoading ? (
              <button className="btn loading" type="submit">
                Sign In
              </button>
            ) : (
              <button className="btn btn-primary" type="submit">
                Sign In
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
