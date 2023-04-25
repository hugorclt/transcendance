import { TUser } from "../../../../services/type"

export type MatchHistoryProps = {
    result: string,
    allyScore: number,
    ally: TUser[],
    ennemyScore: number,
    ennemy: TUser[],
    mode: string,
}

export type AllyTeamProps = {
    allyScore: number,
    ally: TUser[],
}

export type EnnemyTeamProps = {
    ennemyScore: number,
    ennemy: TUser[],
}