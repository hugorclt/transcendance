import React from "react";
import Timer from "./Timer/Timer";
import { SelectorContainer, TimerContainer } from "./Selector.style";
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
