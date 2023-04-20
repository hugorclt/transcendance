import { MatchHistoryProps } from "../MatchHistory";

export function AllyScore({result, score, ally, ennemy, mode}: MatchHistoryProps) {
    return (
        <div>{score[0]}</div>
    );
}