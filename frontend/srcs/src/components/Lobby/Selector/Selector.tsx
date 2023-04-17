import React, { useContext, useEffect, useState } from "react";
import { LobbySocketContext } from "../../../services/Lobby/LobbySocketContext";
import Timer from "./Timer/Timer";
import {
  MapSelectorContainer,
  PaddleContainer,
  PaddleDivFlex,
  PaddleSelectorContainer,
  SelectorContainer,
  TimerContainer,
} from "./Selector.style";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import PaddleSelectorCards from "./PaddleSelectorCards/PaddleSelectorCards";

const map = [
  {
    img: "",
    name: "map1",
  },
  {
    img: "",
    name: "map2",
  },
  {
    img: "",
    name: "map3",
  },
  {
    img: "",
    name: "map4",
  },
];

function Selector() {
  const axiosPrivate = useAxiosPrivate();
  const [paddles, setPaddle] = useState<{ name: string; image: string }[]>([]);

  useEffect(() => {
    axiosPrivate
      .get("/items/user-items")
      .then((res: AxiosResponse) => {
        setPaddle(res.data);
      })
      .catch((err: AxiosError) => {});
  }, []);
  return (
    <>
      <SelectorContainer>
        <MapSelectorContainer>
          <h3>CHOOSE A MAP</h3>
        </MapSelectorContainer>
        <PaddleSelectorContainer>
          <h3>CHOOSE YOUR PADDLE</h3>
            <PaddleContainer>
              {paddles.length == 0 ? (
                <h4>You don't have any Paddle</h4>
              ) : (
                paddles.map((paddle) => {
                  return (
                    <PaddleSelectorCards
                      img={paddle.image}
                      name={paddle.name}
                    />
                  );
                })
              )}
            </PaddleContainer>
        </PaddleSelectorContainer>
        <TimerContainer>
          <Timer />
        </TimerContainer>
      </SelectorContainer>
    </>
  );
}

export default Selector;
