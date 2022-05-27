import Link from 'next/link';
import { PuzzleIcon } from '@heroicons/react/solid';
import Hamburger from './Hamburger';

export default function Navbar() {
  return (
    <div className="navbar bg-utama font-utama px-5 border-b-slate-50 border-2 border-transparent">
      <div className="flex-1">
        <Link href="/" passHref>
          <a className="btn btn-link normal-case text-white text-xl hover:no-underline hover:text-second">
            <PuzzleIcon className="h-5 w-5 text-white mr-2 mt-2 sm:mt-0" />
            <h5 className="invisible sm:visible">Close Mount</h5>
          </a>
        </Link>
      </div>
      <div className="invisible md:visible flex absolute right-1/2 left-1/2 w-52  space-x-5 text-white ">
        <Link href="/games" passHref>
          <a className="hover:border-b-indigo-500 hover:border-2 hover:border-transparent">
            Games
          </a>
        </Link>
      </div>
      <Hamburger />
    </div>
  );
}
