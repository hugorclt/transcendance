import { ResultContainer,
    TeamContainer,
    MatchHistoryContainer1 } from "./MatchHistoryCardStyle";

export function FirstCard() {
    return (
        <MatchHistoryContainer1>
            <ResultContainer>
            <h5>RESULT</h5>
            </ResultContainer>
            <TeamContainer>
            <h5>ALLY TEAM</h5>
            </TeamContainer>
            <TeamContainer>
            <h5>ENNEMY TEAM</h5>
            </TeamContainer>
        </MatchHistoryContainer1>
    );
}