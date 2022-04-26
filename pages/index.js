import Image from "next/image";
import Navbar from "../components/Navbar";
import GamesImage from "../images/gamespage.svg";
import { TwitterShareButton, WhatsappShareButton } from "react-share";
import { TwitterIcon, WhatsappIcon } from "react-share";

export default function Home() {
  return (
    <>
      <div className="bg-utama h-screen font-utama">
        <Navbar />
        <div className="flex justify-between items-center px-20 ">
          <div className="space-y-5  w-1/2">
            <h3 className="text-white text-6xl font-semibold">
              Discover, find,{" "}
              <span className="text-inherit text-second">
                Play extraordinary
              </span>{" "}
              Best Games!
            </h3>
            <h5 className="font-light">
              Best platform games website no 1 in the world!
            </h5>
            <div className="space-x-5">
              <WhatsappShareButton
                title="Play the game with me!"
                url="https://challenge-10-phi.vercel.app/"
              >
                <WhatsappIcon
                  lightingColor="white"
                  round={true}
                  size={32}
                ></WhatsappIcon>
              </WhatsappShareButton>
              <TwitterShareButton
                url="https://challenge-10-phi.vercel.app/"
                title="Play game with your friends!"
              >
                <TwitterIcon
                  lightingColor="white"
                  round={true}
                  size={32}
                ></TwitterIcon>
              </TwitterShareButton>
            </div>
          </div>
          <Image src={GamesImage} width={500} height={500} />
        </div>
      </div>
    </>
  );
}
