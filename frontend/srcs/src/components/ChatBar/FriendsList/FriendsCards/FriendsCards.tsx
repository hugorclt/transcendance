import React, { useEffect, useState } from "react";
import logo from "../../assets/42.jpg";
import { TFriendsProps } from "./FriendsType";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IconContext } from "react-icons/lib";

function FriendsCards(props: TFriendsProps) {
  const [color, setColor] = useState("");

  useEffect(() => {
    console.log("yolo");
    if (props.status == "CONNECTED") setColor("#19e650");
    else if (props.status == "AWAY") setColor("#e6b319");
    else setColor("#8a8a8a");
  }, []);

  return (
    <div>
      <div className="pt-4 pb-2 px-4">
        <div className="flex items-center justify-around">
          <div className="relative">
            <img className="rounded-full w-10" src={props.avatar}></img>
            <div
              style={{ backgroundColor: color }}
              className="absolute outline outline-2 outline-gold rounded-full bottom-0 right-0 w-2 h-2"></div>
          </div>
          <a href="#!">
            <div className="flex flex-col mx-3">
              <p className="text-base font-semibold text-gold mb-0">
                {props.name}
              </p>
              <p className="outline-none bg-dark-blue text-gold opacity-70 text-sm font-light">
                {props.status}
              </p>
            </div>
          </a>
          <IconContext.Provider value={{ color: "#E8C47C" }}>
            <BsThreeDotsVertical />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default FriendsCards;