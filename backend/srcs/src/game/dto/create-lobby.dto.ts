import { IsInt, IsString, Max, Min } from "class-validator";

export class CreateLobbyDto {

    @IsString()
    mode: 'classic' | 'champions';

    @IsInt()
    @Min(1)
    @Max(4)
    players: number;
}