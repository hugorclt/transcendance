
import { BotProfileContainer, FirstCardContainer } from "./BotProfileStyle.js";
import { MatchHistoryCards } from './MatchHistoryCards/MatchHistoryCards.js';
import { FirstCard } from './MatchHistoryCards/FirstCard.js';

const data = [
    { result: "VICTORY", stats: ["8", "2", "3"] },
    { result: "DEFEAT", stats: ["2", "7", "4"] },
    { result: "DEFEAT", stats: ["5", "6", "7"] },
    { result: "VICTORY", stats: ["9", "5", "2"] },
];

export function BotProfile() {
    return (
        <BotProfileContainer>
            <FirstCardContainer>
                <h2>Match History</h2>
            </FirstCardContainer>
            <FirstCard/>
            <MatchHistoryCards
            result={data[0].result}
            stats={data[0].stats}/>
            <MatchHistoryCards
            result={data[1].result}
            stats={data[1].stats}/>
            <MatchHistoryCards
            result={data[2].result}
            stats={data[2].stats}/>
            <MatchHistoryCards
            result={data[3].result}
            stats={data[3].stats}/>
        </BotProfileContainer>
    )
}