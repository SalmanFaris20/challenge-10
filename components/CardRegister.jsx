import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import google from '../images/google.svg';
import facebook from '../images/facebook.svg';
import AuthMiddleware from '../middlewares/authMiddleware';
import {
  registerAuth,
  updateAuthenticatedUser,
  updateCredentials,
} from '../redux/auth/authSlice';

export default function CardRegister() {
  const dispatch = useDispatch();
  const authed = useSelector((state) => state.auth);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(registerAuth(authed.form)).then((response) => {
      if (response.error) {
        toast.error('error', {
          position: 'top-right',
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
      }),
    );
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const { user } = result;
        setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          username: user.displayName,
          gender: 'Men',
          score: {
            game1: 0,
            game2: 0,
          },
          gameplayed: {
            game1: false,
            game2: false,
          },
          createdAt: Timestamp.fromDate(new Date()),
        });
        dispatch(
          updateAuthenticatedUser({
            email: user.email,
            username: user.displayName,
            gender: 'Men',
          }),
        );
        router.push('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <AuthMiddleware>
      <ToastContainer />
      <div className="card w-96 text-ungu">
        <form className="card-body space-y-2" onSubmit={handleSubmit}>
          <h2 className="card-title flex justify-center text-4xl font-bold">
            Register
          </h2>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="username">
              <span className="label-text text-ungu">Username</span>
            </label>
            <input
              type="text"
              name="username"
              onChange={onInputChange}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs text-white"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="email">
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
            <label className="label" htmlFor="gender">
              <span className="label-text text-ungu">Gender</span>
            </label>
            <select
              className="select select-bordered text-white"
              name="gender"
              onChange={onInputChange}
            >
              <option disabled>Pick one</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="password">
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
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="confirmpassword">
              <span className="label-text text-ungu">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmpassword"
              onChange={onInputChange}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs text-white"
            />
          </div>
          <div className="flex justify-end">
            <h5 className="font-light text-ungu">
              Already have an account? Please{' '}
              <Link href="/login" passHref>
                <a className="text-login font-bold">Sign In</a>
              </Link>
            </h5>
          </div>
          <div className="card-actions justify-between">
            <div className="flex justify-around w-20">
              <div onClick={handleGoogle}>
                <Image src={google} width={30} height={30} />
              </div>
              <div>
                <Image src={facebook} width={30} height={30} />
              </div>
            </div>
            {authed.isRegisterLoading ? (
              <button className="btn loading" type="button">
                Register
              </button>
            ) : (
              <button className="btn bg-login" type="submit">
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </AuthMiddleware>
  );
}
