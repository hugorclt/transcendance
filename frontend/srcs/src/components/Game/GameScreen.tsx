import { Canvas } from "@react-three/fiber";
import React, { FC, useEffect, useRef, useState } from "react";
import { COLORS } from "../../colors";
import Game from "./Game";
import { Effects, Stars } from "@react-three/drei";
import BlueFlame from "./effects/BlueFlame";
import { OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";
import Scene from "./Scene";
import MyEffects from "./Effects";
import Skybox from "./Components/sceneComponents/Skybox";
import PaddleScene from "./Components/sceneComponents/Paddle";
import Scoreboard from "./Scoreboard";
import { useContext } from "react";
import { LobbySocketContext } from "../../services/Lobby/LobbySocketContext";


const GameScreen = () => {
  const socket = useContext(LobbySocketContext);
  const screenRef = useRef<any>();
  const downloadRef = useRef<any>();
  const [media, setMedia] = useState<any>();
  const [playerScore, setPlayerScore] = useState<any>({});
  const [teamScore1, setTeamScore1] = useState<number>(0);
  const [teamScore2, setTeamScore2] = useState<number>(0);

  useEffect(() => {
    socket?.on("goal", (data) => {
      setPlayerScore(data);
      

      console.log(data._z)
      if (data._z === 1) {setTeamScore1((score) => score + 1);}
      if (data._z === -1) {setTeamScore2((score) => score + 1);}

      //   if (data.collisions === "goal2")
      //   setTeamScore2((score) => score + 1);

    });
    return () => {
      socket?.off("goal");
    };
  }, [socket]);

  useEffect(() => {
  }, [playerScore]);

  return (
    <>
      <div style={{position: "absolute", zIndex: "10", width: "100%", display: "flex", justifyContent: "center"}}>
        <Scoreboard team1Score={teamScore1} team2Score={teamScore2} />
      </div>
      <div style={{ width: "100vw", height: "100vh"}}>
        <Canvas
          ref={screenRef}
          tabIndex={0}
          style={{ background: COLORS.background }}
          linear
        >

          <Game />
          {/* <Skybox /> */}
          <MyEffects />
        </Canvas>
      </div>
    </>
  );
};

export default GameScreen;
