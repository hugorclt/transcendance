import React, { useContext, useEffect, useState } from "react";
import { LobbySocketContext } from "../../../services/Lobby/LobbySocketContext";
import Timer from "./Timer/Timer";
import {
  MapSelectorContainer,
  PaddleSelectorContainer,
  SelectItemContainer,
  SelectorContainer,
  TimerContainer,
} from "./Selector.style";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import PaddleSelectorCards from "./PaddleSelectorCards/PaddleSelectorCards";
import MapSelectorCards from "./MapSelectorCards/MapSelectorCards";
import { useAtom } from "jotai";
import { lobbyAtom } from "../../../services/store";

const maps = [
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
  const [paddleSelected, setPaddleSelected] = useState("");
  const [lobby] = useAtom(lobbyAtom);

  useEffect(() => {
    axiosPrivate
      .get("/items/user-items")
      .then((res: AxiosResponse) => {
        setPaddle(res.data);
      })
      .catch((err: AxiosError) => {});
  }, []);

  const handleClick = (e: any, paddleName: string) => {
    setPaddleSelected(paddleName);
    axiosPrivate.post("/lobby/paddle-selected", {lobbyId: lobby.id ,name: paddleName});
  }
  return (
    <>
      <SelectorContainer>
        <MapSelectorContainer>
          <h3>CHOOSE A MAP</h3>
          <SelectItemContainer>
            {maps.map((map) => {
              return <MapSelectorCards name={map.name} img={map.img} />;
            })}
          </SelectItemContainer>
        </MapSelectorContainer>
        <PaddleSelectorContainer>
          <h3>CHOOSE YOUR PADDLE</h3>
          <SelectItemContainer>
            {paddles.length == 0 ? (
              <h4>You don't have any Paddle</h4>
            ) : (
              paddles.map((paddle) => {
                return (
                  <div onClick={(e) => handleClick(e, paddle.name)}>
                    <PaddleSelectorCards
                      img={paddle.image}
                      name={paddle.name}
                      isSelected={paddle.name == paddleSelected ? true: false}
                    />
                  </div>
                );
              })
            )}
          </SelectItemContainer>
        </PaddleSelectorContainer>
        <TimerContainer>
          <Timer />
        </TimerContainer>
      </SelectorContainer>
    </>
  );
}

export default Selector;
