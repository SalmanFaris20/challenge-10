import Image from 'next/image';
import LoginImage from '../../images/login.svg';
import Cardlogin from '../../components/Cardlogin';
import AuthMiddleware from '../../middlewares/authMiddleware';

export default function Login() {
  return (
    <AuthMiddleware>
      <div className="grid grid-cols-2 bg-white h-screen ">
        <div className="w-full">
          <Image src={LoginImage} layout="fill" objectFit="cover" />
        </div>
        <div className="absolute bottom-52 left-4 sm:left-4 lg:left-10 xl:left-14 ">
          <Cardlogin />
        </div>
      </div>
    </AuthMiddleware>
  );
}
