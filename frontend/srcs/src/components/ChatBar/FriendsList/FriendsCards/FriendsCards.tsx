import React, { useEffect, useState } from "react";
import logo from "../../assets/42.jpg";
import { TFriendsProps } from "./FriendsType";
import { TbMessageCircle2 } from "react-icons/tb";
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
        <div className="flex items-center justify-between">
          <div className="relative">
            <img className="rounded-full w-10" src={props.avatar}></img>
            <div
              style={{ backgroundColor: color }}
              className="absolute outline outline-2 outline-orange-100 rounded-full bottom-0 right-0 w-2 h-2"></div>
          </div>
          <a href="#!">
            <div className="flex flex-col mx-3">
              <p className="text-base font-semibold text-orange-100 mb-0">
                {props.name}
              </p>
              <p className="outline-none bg-gray-900 text-orange-100 opacity-60 text-sm font-extralight">
                {props.status}
              </p>
            </div>
          </a>
          <IconContext.Provider value={{ color: "#E8C47C" }}>
            <TbMessageCircle2></TbMessageCircle2>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default FriendsCards;
