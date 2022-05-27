import { useSelector } from 'react-redux';
import { ClimbingBoxLoader } from 'react-spinners';
import CardGames from '../../components/CardGames';
import Navbar from '../../components/Navbar';

export default function ListGames() {
  const games = useSelector((state) => state.games);

  return (
    <div className="bg-utama sm:h-screen justify-center items-center">
      <Navbar />
      <div className="absolute top-1/2 right-1/2" data-aos="zoom-in-up">
        {games.isListGamesLoading && (
          <ClimbingBoxLoader color="#FFFFFF" size={15} />
        )}
      </div>
      <div>
        <CardGames />
      </div>
    </div>
  );
}
