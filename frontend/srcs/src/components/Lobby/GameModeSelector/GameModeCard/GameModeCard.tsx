import React from "react";
import { useState } from "react";
import { useLobbyContext } from "../../../../views/LobbyPage/LobbyContext";

interface Props {
  mode: string;
  description: string;
}

function GameModeCard(props: Props) {
  const [onHover, setOnHover] = useState(false);
  const { setOnModeSelected, setSelectedMode, setPlayers } = useLobbyContext();
  const handle1v1Click = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOnModeSelected(true);
    setPlayers(2);
    setSelectedMode(props.mode);
  };
  const handle2v2Click = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOnModeSelected(true);
    setPlayers(4);
    setSelectedMode(props.mode);
  };

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
              {props.mode}
            </div>
          </div>
          {/* Div containibg both buttons to select 1v1 or 2v2 */}
          <div className="flex w-full h-1/5 items-center justify-around pb-5">
            {onHover && (
              <>
                <button
                  onClick={handle1v1Click}
                  className="bg-dark-blue w-32 h-10 hover:bg-gold hover:text-dark-blue text-white rounded-full border-gold border-4"
                >
                  1 vs 1
                </button>
                <button
                  onClick={handle2v2Click}
                  className="bg-dark-blue w-32 h-10 hover:bg-gold hover:text-dark-blue text-white rounded-full border-gold border-4"
                >
                  2 vs 2
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex bg-transparent rounded-b-3xl w-full h-1/5">
          {onHover && (
            <div className="flex flex-col w-full h-full justify-center items-center">
              <h1 className=" text-center text-xl">{props.mode}</h1>
              <div className=" h-1/6" />
              <p className="text-center">{props.description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default GameModeCard;
