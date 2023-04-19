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
import PaddleSelectorCards from "./PaddleSelector/PaddleSelectorCards/PaddleSelectorCards";
import MapSelectorCards from "./MapSelector/MapSelectorCards/MapSelectorCards";
import { useAtom } from "jotai";
import { lobbyAtom } from "../../../services/store";
import { getMapName } from "../../../services/utils/getMapName";
import { EMap } from "../../../shared/enum";
import {nanoid} from 'nanoid';
import MapSelector from "./MapSelector/MapSelector";
import PaddleSelector from "./PaddleSelector/PaddleSelector";

function Selector() {
  return (
    <>
      <SelectorContainer>
        <MapSelector />
        <PaddleSelector />
        <TimerContainer>
          <Timer />
        </TimerContainer>
      </SelectorContainer>
    </>
  );
}

export default Selector;
