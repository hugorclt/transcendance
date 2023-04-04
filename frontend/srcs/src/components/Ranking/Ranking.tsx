import React from 'react'
import { COLORS } from '../../colors';
import { RankingContainer, RankingRightSide } from './Ranking.style';
import RankingCards from './RankingCards/RankingCards'

const stats = [
    "win",
    "goal",
    "touch",
]

const data = [
    {name: "hugo", stats: [
        "1000",
        "2000",
        "10000",
    ]},
    {name: "hugo", stats: [
        "1000",
        "2000",
        "10000",
    ]},
    {name: "hugo", stats: [
        "1000",
        "2000",
        "10000",
    ]},
    {name: "hugo", stats: [
        "1000",
        "2000",
        "10000",
    ]},
    {name: "hugo", stats: [
        "1000",
        "2000",
        "10000",
    ]},
    {name: "hugo", stats: [
        "1000",
        "2000",
        "10000",
    ]},
    {name: "hugo", stats: [
        "1000",
        "2000",
        "10000",
    ]},
    {name: "hugo", stats: [
        "1000",
        "2000",
        "10000",
    ]},
    {name: "hugo", stats: [
        "1000",
        "2000",
        "10000",
    ]},
    {name: "hugo", stats: [
        "1000",
        "2000",
        "10000",
    ]},
]

function Ranking() {
  return (
    <>
    <RankingContainer>
        <h3>NAME</h3>
        <RankingRightSide>
            {stats.map((stat) => {
                return (
                    <h3>{stat}</h3>
                )
            })}
        </RankingRightSide>
    </RankingContainer>
    {data.map((user, index) => {
        var color;
        if (index % 2 == 0)
            color = COLORS.background;
        else
            color = COLORS.darkergrey;
        return (
            <RankingCards index={index + 1} name={user.name} stats={user.stats} color={color}/>
        )
    })}
    </>
  )
}

export default Ranking