import React from "react";
import { useState } from "react";

function GameModeCard() {
  const [onHover, setOnHover] = useState(false);

  const handleButtonClick = () => {};

  return (
    <>
      <div
        className="hover:w-3/6 transition-all duration-500 bg-gold border-dark-blue border-4 rounded-3xl w-1/6 h-1/2"
        onMouseOver={() => setOnHover(true)}
        onMouseOut={() => setOnHover(false)}
      >
        <div className="flex flex-col rounded-t-3xl justify-end bg-dark-blue w-full h-4/5">
          {/* Clickable diamond centered */}
          <div className="flex w-full h-1/5 justify-center items-center pb-8">
            <div className=" w-24 h-10 rounded-full bg-gold border-gold border-4"></div>
          </div>
          {/* Div containibg both buttons to select 1v1 or 2v2 */}
          <div className="flex w-full h-1/5 items-center justify-around pb-5">
            {onHover && (
              <>
                <button className="bg-dark-blue w-32 h-10 hover:bg-gold rounded-full border-gold border-4" />
                <button className="bg-dark-blue w-32 h-10 hover:bg-gold rounded-full border-gold border-4" />
              </>
            )}
          </div>
        </div>
        <div className="flex bg-transparent rounded-b-3xl w-full h-1/5">
          {onHover && (
            <div className="flex flex-col w-full h-full justify-center items-center">
              <p className="text-center">Description du bail</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default GameModeCard;
