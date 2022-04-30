import Image from "next/image";
import Navbar from "../components/Navbar";
import { TwitterShareButton, WhatsappShareButton } from "react-share";
import { TwitterIcon, WhatsappIcon } from "react-share";
import pattern from "../images/pattern.svg";

export default function Home() {
  return (
    <>
      <div className="h-screen font-utama bg-utama">
        <div className="absolute w-full z-50">
          <Navbar />
        </div>
        <div>
          <Image src={pattern} layout="fill" objectFit="cover" />
        </div>
        <div>
          <div className="absolute bottom-40 left-6 sm:bottom-20 sm:left-10">
            <div className="space-y-5  w-1/2" data-aos="fade-right">
              <h3 className="text-white text-6xl font-semibold">CloseMount</h3>
              <h5 className="font-light w-72 text-lg">
                Lets play the games and get your point for no 1{" "}
                <span className="text-emas">leaderboard!</span>
              </h5>
              <button className="btn bg-pink px-5 py-2">Lets Play!</button>
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
          </div>
        </div>
      </div>
    </>
  );
}
