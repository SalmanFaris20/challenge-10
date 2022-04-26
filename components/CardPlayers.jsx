import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataPlayer } from "../redux/auth/authSlice";
import men from "../images/male.png";
import women from "../images/female.png";
import Image from "next/image";

export default function CardPlayers() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loadPosts = async () => {
    try {
      const response = await dispatch(fetchDataPlayer()).unwrap();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-wrap gap-10 w-full px-10 justify-start items-center mt-20 ">
        {auth.data.map((item) => {
          return (
            <div className="card w-72 bg-base-100 shadow-xl" key={item.idgame}>
              <figure className="px-5 pt-5">
                {item.gender === "Men" && (
                  <Image src={men} alt="games" className="rounded-xl bg-emas" />
                )}
                {item.gender === "Women" && (
                  <Image
                    src={women}
                    alt="games"
                    className="rounded-xl bg-emas"
                  />
                )}
              </figure>
              <div className="card-body items-center text-center">
                <div className="flex justify-between w-full">
                  <div>
                    <h5 className="text-sm italic ">username:</h5>
                    <h5 className="card-title text-base">{item.username}</h5>
                  </div>
                  <div className="flex gap-2">
                    <button className="card-title text-base bg-second rounded-md p-1">
                      {item.score.game1}
                    </button>
                    <button className="card-title text-base bg-red-600 rounded-md p-1">
                      {item.score.game2}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
