import React from "react";
import { SelectorCardsContainer } from "../../PaddleSelector/PaddleSelectorCards/PaddleSelector.style";
import {BsFillHandThumbsUpFill} from 'react-icons/bs'
import { COLORS } from "../../../../../colors";
import {nanoid} from 'nanoid'

function MapSelectorCards({ name, img, votes }) {

  const renderVote = () => {
    const vote: JSX.Element[] = [];

    for (let i = 0; i < votes; i++) {
      vote.push(<BsFillHandThumbsUpFill key={nanoid()}  size={30} color={COLORS.secondary} />)
    }
    return vote;
  }

  return (
    <SelectorCardsContainer
      style={{
        backgroundPosition: "center center",
        backgroundImage: `url(data:image/gif;base64,${img})`,
        backgroundSize: "cover",
      }}>
        <h4>{name}</h4>
        {renderVote()}
      </SelectorCardsContainer>
  );
}

export default MapSelectorCards;
