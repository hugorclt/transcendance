import React, { useState } from "react";
import logo from "../../assets/42.jpg";
import { TFriendsProps } from "./FriendsType";
import { TbMessageCircle2 } from "react-icons/tb";
import { IconContext } from "react-icons/lib";

function FriendsCards(props: TFriendsProps) {
  const [show, setShow] = useState("false");

  const showMessageButton = () => {
    setShow("true");
  };
  const hideMessageButton = () => {
    setShow("false");
  };
  return (
    <div>
      <div className="pt-4 pb-2 px-4">
        <div
          className="flex items-center justify-between"
          onMouseEnter={showMessageButton}
          onMouseLeave={hideMessageButton}>
          <div className="relative">
            <img className="rounded-full w-10" src={props.avatar}></img>
            <div className="absolute outline outline-2 outline-orange-100 rounded-full bottom-0 right-0 w-2 h-2 bg-lime-500"></div>
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
          {show && (
            <button className="px-3">
              <IconContext.Provider value={{ color: "#E8C47C" }}>
                <TbMessageCircle2></TbMessageCircle2>
              </IconContext.Provider>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendsCards;

export default FriendsCards