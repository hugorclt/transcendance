import { AllyTeamProps, MatchHistoryProps } from "../MatchHistory";

export function AllyScore({allyScore, ally}: AllyTeamProps) {
    return (
        <h4>{allyScore}</h4>
    );
}