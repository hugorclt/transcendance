import React from "react";
import { useState } from "react";

function GameModeCard() {
  const [onHover, setOnHover] = useState(false);

  const handleButtonClick = () => {};

  return (
    <>
      <div
        className="hover:w-2/5 hover:h-4/6 transition-all duration-500 bg-gold border-dark-blue border-4 rounded-3xl w-1/6 h-1/2"
        onMouseOver={() => setOnHover(true)}
        onMouseOut={() => setOnHover(false)}
      >
        <div className="flex flex-col rounded-t-3xl justify-end bg-dark-blue w-full h-4/5">
          {/* Clickable diamond centered */}
          <div className="flex w-full h-1/5 justify-center items-center pb-8">
            <div className=" text-center align-middle text-2xl text-dark-blue w-24 h-10 rounded-full bg-gold border-gold border-4">
              MODE
            </div>
          </div>
          {/* Div containibg both buttons to select 1v1 or 2v2 */}
          <div className="flex w-full h-1/5 items-center justify-around pb-5">
            {onHover && (
              <>
                <button className="bg-dark-blue w-32 h-10 hover:bg-gold hover:text-dark-blue text-white rounded-full border-gold border-4">
                  1 vs 1
                </button>
                <button className="bg-dark-blue w-32 h-10 hover:bg-gold hover:text-dark-blue text-white rounded-full border-gold border-4">
                  2 vs 2
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex bg-transparent rounded-b-3xl w-full h-1/5">
          {onHover && (
            <div className="flex flex-col w-full h-full justify-center items-center">
              <h1 className=" text-center text-xl">Mode de jeu</h1>
              <div className=" h-1/6" />
              <p className="text-center">
                Ceci est la description du mode de jeu.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default GameModeCard;
