import { AllyTeamProps, MatchHistoryProps } from "../MatchHistory";
import { AllyScore } from "./AllyScore";
import { AllyList } from "./AllyList";
import { AllyScoreContainer, AllyTeamContainer, AllyListContainer } from "./AllyTeamStyle";

export function AllyTeam({allyScore, ally }: AllyTeamProps) {
    return (
        <AllyTeamContainer>
            <AllyListContainer>
            <AllyList
            allyScore={allyScore}
            ally={ally}/>
            </AllyListContainer>
            <AllyScoreContainer>
            <AllyScore
            allyScore={allyScore}
            ally={ally}/>
            </AllyScoreContainer>
        </AllyTeamContainer>
    );
}