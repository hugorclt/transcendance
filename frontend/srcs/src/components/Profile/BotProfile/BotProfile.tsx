
import { BotProfileContainer, FirstCardContainer } from "./BotProfileStyle.js";
import { MatchHistoryCards } from './MatchHistoryCards/MatchHistoryCards.js';
import { FirstCard } from './MatchHistoryCards/FirstCard.js';

const data = [
    { result: "VICTORY", score: ["8", "2"], ally: ["Ryad", "Dylan"], ennemy: ["Hugo", "Doume"], mode: "CLASSIC" },
    { result: "DEFEAT", score: ["1", "3"], ally: ["Ryad"], ennemy: ["Hugo"], mode: "CLASSIC" },
    { result: "DEFEAT", score: ["4", "7"], ally: ["Ryad", "Hugo"], ennemy: ["Dylan", "Doume"], mode: "CHAMPIONS" },
    { result: "VICTORY", score: ["5", "4"], ally: ["Ryad"], ennemy: ["Doume"], mode: "CHAMPIONS" },
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
            score={data[0].score}
            ally={data[0].ally}
            ennemy={data[0].ennemy}
            mode={data[0].mode}/>
            <MatchHistoryCards
            result={data[1].result}
            score={data[1].score}
            ally={data[1].ally}
            ennemy={data[1].ennemy}
            mode={data[1].mode}/>
            <MatchHistoryCards
            result={data[2].result}
            score={data[2].score}
            ally={data[2].ally}
            ennemy={data[2].ennemy}
            mode={data[2].mode}/>
            <MatchHistoryCards
            result={data[3].result}
            score={data[3].score}
            ally={data[3].ally}
            ennemy={data[3].ennemy}
            mode={data[3].mode}/>
        </BotProfileContainer>
    )
}