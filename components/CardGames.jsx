/* eslint-disable arrow-body-style */
import { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from '../redux/games/gamesSlice';

export default function CardGames() {
  const games = useSelector((state) => state.games);
  const dispatch = useDispatch();

  const loadPosts = async () => {
    try {
      await dispatch(fetchData()).unwrap();
    } catch (err) {
      const errorMessage = err.message;
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);
  return (
    <div className="flex flex-row flex-wrap space-x-0 space-y-10 py-10 sm:py-10  sm:space-x-10 sm:space-y-0  justify-center items-center mt-20">
      {games.data.map((item) => {
        return (
          <div className="card w-72 bg-base-100 shadow-xl" key={item.idgame}>
            <figure className="px-10 pt-10">
              <img src={item.img_url} alt="games" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <div className="flex justify-between w-full">
                <h5 className="card-title text-base">{item.name}</h5>
                <button
                  className="card-title text-base bg-second rounded-md p-1"
                  type="button"
                >
                  #1
                </button>
              </div>
              <div className="flex justify-center mt-5 w-full">
                <Link href={`/games/${item.idgame}`}>
                  <div className="card-actions">
                    <button className="btn btn-primary" type="button">
                      Play
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
