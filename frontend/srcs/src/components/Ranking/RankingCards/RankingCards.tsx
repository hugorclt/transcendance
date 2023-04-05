import React from 'react'
import { TRankCardsProps } from './Ranking'
import { RankingCardsContainer, RankingCardsLeftSide, RankingCardsRightSide } from './RankingCards.style'

function RankingCards({name, stats, color, index} : TRankCardsProps) {
  return (
    <>
        <RankingCardsContainer style={{backgroundColor: color}}>
            <h3>{index} {name}</h3>
            <h3></h3>
            <RankingCardsRightSide>
                {stats.map((stat) => {
                    return (
                        <h3>{stat}</h3>
                    )
                })}
            </RankingCardsRightSide>
        </RankingCardsContainer>
    </>
  )
}

export default RankingCards