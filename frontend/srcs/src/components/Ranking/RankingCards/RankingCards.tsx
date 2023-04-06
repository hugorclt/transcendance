import React from "react";
import { TRankCardsProps } from "./Ranking";
import { RankingLine } from "./RankingCards.style";
import { nanoid } from "nanoid";
import { TableData, TableRow } from "../Ranking.style";
import { COLORS } from "../../../colors";

function RankingCards({ name, stats, color, index }: TRankCardsProps) {

  const renderColor = (index: number) => {
    if (index == 1) return "#FFFD70";
    else if (index == 2) return "#C0C0C0";
    else if (index == 3) return "#CD7F32";
    return COLORS.primary
  }
  return (
    <TableRow style={{ backgroundColor: color }}>
      <TableData>
        <h5>
          <span style={{color: renderColor(index)}}>{index}</span> {name}
        </h5>
      </TableData>
      {stats.map((stat) => {
        return (
          <TableData key={nanoid()}>
            <p>{stat}</p>
          </TableData>
        );
      })}
    </TableRow>
  );
}

export default RankingCards;
