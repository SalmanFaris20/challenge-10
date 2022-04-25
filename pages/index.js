import Image from "next/image";
import Navbar from "../components/Navbar";
import background from "../images/homepage.jpg";

export default function Home() {
  return (
    <>
      <div>
        <Image src={background} layout="fill" objectFit="cover" />
      </div>
      <div className="absolute inset-y-0 w-full">
        <Navbar />
      </div>
    </>
  );
}
