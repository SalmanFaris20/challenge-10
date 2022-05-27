import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { logout } from '../redux/auth/authSlice';
import men from '../images/male.png';
import women from '../images/female.png';

export default function RightNav({ open }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.authenticatedUser);

  const handleLogOut = async () => {
    await dispatch(logout());
  };
  return (
    <Ul open={open}>
      <div className="md:invisible flex flex-col space-y-10 text-white ">
        <Link href="/games" passHref>
          <a className="hover:border-b-indigo-500 hover:border-2 hover:border-transparent">
            Games
          </a>
        </Link>
        <Link href="/listplayers" passHref>
          <a className="hover:border-b-indigo-500 hover:border-2 hover:border-transparent">
            List Players
          </a>
        </Link>
      </div>
      <div className="flex w-52 h-0.5 bg-red-700 md:invisible" />
      {data ? (
        <div className="flex items-center gap-1 text-white">
          <h5>{data.username}</h5>
          <div className="dropdown dropdown-end">
            <label
              tabIndex="0"
              className="btn btn-ghost btn-circle avatar flex gap-2"
              htmlFor="htmlFor"
            >
              <div className="w-10 rounded-full">
                {data && (
                  <>
                    {data.gender === 'Men' && (
                      <Image
                        src={men}
                        height={500}
                        width={500}
                        alt="AvatarMen"
                      />
                    )}
                    {data.gender === 'Women' && (
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
            <ul className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <Link href="/profile" passHref>
                  <a className="justify-between">Profile</a>
                </Link>
              </li>

              <li onClick={handleLogOut}>
                <button type="button">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-x-0 space-y-10 md:space-y-0 md:flex-row md:space-x-5">
          <Link href="/login" passHref>
            <a className="hover:border-b-indigo-500 hover:border-2 hover:border-transparent">
              Login
            </a>
          </Link>
          <Link href="/register" passHref>
            <a className="hover:border-b-indigo-500 hover:border-2 hover:border-transparent">
              Register
            </a>
          </Link>
        </div>
      )}
    </Ul>
  );
}

RightNav.propTypes = {
  open: propTypes.bool.isRequired,
};

const Ul = styled.div`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    justify-content: center;
    background-color: #0d2538;
    text-align: center;
    position: fixed;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    top: 0;
    gap: 5rem;
    right: 0;
    height: 100vh;
    z-index: 10;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
  }
`;
