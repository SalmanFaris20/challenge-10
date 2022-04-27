import Image from "next/image";
import Navbar from "../components/Navbar";
import GamesImage from "../images/gamespage.svg";
import { TwitterShareButton, WhatsappShareButton } from "react-share";
import { TwitterIcon, WhatsappIcon } from "react-share";
import Tilt from "react-tilt";
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
          <div className="absolute bottom-5 left-10 ">
            <div className="space-y-5  w-1/2" data-aos="fade-right">
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
          </div>
        </div>
      </div>
    </>
  );
}
