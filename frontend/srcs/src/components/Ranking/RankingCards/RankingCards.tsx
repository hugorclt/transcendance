import React from "react";
import { TRankCardsProps } from "./Ranking";
import { RankingLine } from "./RankingCards.style";
import { nanoid } from "nanoid";

function RankingCards({ name, stats, color, index }: TRankCardsProps) {
  return (
    <tr style={{ backgroundColor: color }}>
      <td>
        <h5>
          {index} {name}
        </h5>
      </td>
      {stats.map((stat) => {
        return (
          <td key={nanoid()}>
            <p>{stat}</p>
          </td>
        );
      })}
    </tr>
  );
}

export default RankingCards;
