import { AllyTeamProps, MatchHistoryProps } from "../MatchHistory";

export function AllyList({allyScore, ally}: AllyTeamProps) {
    return (
        <div>{ally.map((el) => (<div>{el.username}</div>))}</div>
    );
}