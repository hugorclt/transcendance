import { InfoDivContainer, MatchHistoryContainer1 } from "./MatchHistoryCardStyle";

export function FirstCard() {
    return (
        <MatchHistoryContainer1>
            <InfoDivContainer>
            <h5>RESULT</h5>
            </InfoDivContainer>
            <InfoDivContainer>
            <h5>SCORED GOALS</h5>
            </InfoDivContainer>
            <InfoDivContainer>
            <h5>CONCEDED GOALS</h5>
            </InfoDivContainer>
            <InfoDivContainer>
            <h5>BONUS</h5>
            </InfoDivContainer>
        </MatchHistoryContainer1>
    );
}