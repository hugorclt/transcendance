import { MatchHistoryProps } from "../MatchHistory";

export function AllyList({result, score, ally, ennemy, mode}: MatchHistoryProps) {
    return (
        <div>{ally.map((el) => (<div>{el}</div>))}</div>
    );
}