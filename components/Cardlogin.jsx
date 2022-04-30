import { useDispatch, useSelector } from "react-redux";
import {
  loginAuth,
  updateAuthenticatedUser,
  updateCredentials,
} from "../redux/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import google from "../images/google.svg";
import facebook from "../images/facebook.svg";
import Image from "next/image";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { useRouter } from "next/router";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default function Cardlogin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const authed = useSelector((state) => state.auth);
  const onInputChange = (event) => {
    dispatch(
      updateCredentials({
        name: event.target.name,
        value: event.target.value,
      })
    );
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          updateAuthenticatedUser({
            email: user.email,
            username: user.displayName,
            gender: "Men",
          })
        );
        console.log(user);
        router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handleFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("user facebook", user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dispatch(loginAuth(authed.form)).then((response) => {
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
      <div className=" w-96  text-ungu">
        <form className="card-body space-y-3" onSubmit={onSubmit}>
          <h2 className="card-title  flex justify-center text-4xl font-bold">
            LOGIN
          </h2>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-ungu">Email</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={onInputChange}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs text-white"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-ungu">Password</span>
            </label>
            <input
              type="password"
              name="password"
              onChange={onInputChange}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs text-white"
            />
          </div>
          <div className="flex justify-start">
            <h5 className="text-ungu font-light">
              not have an account?{" "}
              <Link href={"/register"} passHref>
                <a className="text-login font-bold">Sign Up</a>
              </Link>
            </h5>
          </div>
          <div className="card-actions justify-between items-center">
            <div className="flex justify-around w-20">
              <div onClick={handleGoogle}>
                <Image src={google} width={30} height={30} />
              </div>
              <div onClick={handleFacebook}>
                <Image src={facebook} width={30} height={30} />
              </div>
            </div>
            {authed.isLoginLoading ? (
              <button className="btn loading" type="submit">
                Sign In
              </button>
            ) : (
              <button className="btn bg-login" type="submit">
                Sign In
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
