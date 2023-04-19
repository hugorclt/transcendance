import React from "react";
import { COLORS } from "../../../../colors";
import { MatchHistoryProps } from "./MatchHistory";
import { MatchHistoryContainer2 } from "./MatchHistoryCardStyle";
import { InfoDivContainer } from "./MatchHistoryCardStyle";

export function MatchHistoryCards({result, stats, color}: MatchHistoryProps) {
    return (
       <MatchHistoryContainer2 style={{backgroundColor: color}}>
        <InfoDivContainer>
            <h5>{result}</h5>
        </InfoDivContainer>
        <InfoDivContainer>
            <h5>{stats[0]}</h5>
        </InfoDivContainer>
        <InfoDivContainer>
            <h5>{stats[1]}</h5>
        </InfoDivContainer>
        <InfoDivContainer>
            <h5>{stats[2]}</h5>
        </InfoDivContainer>
        </MatchHistoryContainer2>
    );
}