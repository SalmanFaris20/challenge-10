import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './Navbar';
import { updateScoreGame2 } from '../redux/games/gamesSlice';

export default function Random() {
  const [result, setResult] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [round, setRound] = useState(0);
  const [active, setActive] = useState(true);
  const dispatch = useDispatch();

  const handleRefresh = async () => {
    dispatch(
      updateScoreGame2({
        result: result,
      }),
    );
    setResult(0);
    setRefresh(false);
    setActive(true);
    setRound(0);
  };

  const randomClick = () => {
    setResult(Math.floor(Math.random() * 10));

    setRound(round + 1);
    if (round === 2) {
      setActive(false);
      setRefresh(true);
      setRefresh(true);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col  justify-center items-center h-screen space-y-10">
        {refresh && (
          <div onClick={() => handleRefresh()}>
            <div className="justify-center w-96 flex">
              <button className="btn btn-secondary" type="button">
                Play Again
              </button>
            </div>
          </div>
        )}
        <div className="text-6xl font-bold  text-white">{result}</div>
        {active ? (
          <button
            onClick={randomClick}
            className="btn btn-primary"
            type="button"
          >
            Play
          </button>
        ) : (
          <button className="btn btn-primary cursor-not-allowed" type="button">
            Play
          </button>
        )}
      </div>
    </>
  );
}
