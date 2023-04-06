import React from "react";
import { TRankCardsProps } from "./Ranking";
import { RankingLine } from "./RankingCards.style";
import { nanoid } from "nanoid";
import { TableData, TableRow } from "../Ranking.style";

function RankingCards({ name, stats, color, index }: TRankCardsProps) {
  return (
    <TableRow style={{ backgroundColor: color }}>
      <TableData>
        <h5>
          {index} {name}
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
