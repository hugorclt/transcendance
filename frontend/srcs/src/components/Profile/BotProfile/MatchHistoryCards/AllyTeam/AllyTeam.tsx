import { MatchHistoryProps } from "../MatchHistory";
import { AllyScore } from "./AllyScore";
import { AllyList } from "./AllyList";
import { AllyScoreContainer, AllyTeamContainer, AllyListContainer } from "./AllyTeamStyle";

export function AllyTeam({result, score, ally, ennemy, mode}: MatchHistoryProps) {
    return (
        <AllyTeamContainer>
            <AllyListContainer>
            <AllyList
            result={result}
            score={score}
            ally={ally}
            ennemy={ennemy}
            mode={mode}/>
            </AllyListContainer>
            <AllyScoreContainer>
            <AllyScore
            result={result}
            score={score}
            ally={ally}
            ennemy={ennemy}
            mode={mode}/>
            </AllyScoreContainer>
        </AllyTeamContainer>
    );
}