import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SearchRoomDto {
    @IsNotEmpty()
    @ApiProperty()
    @MaxLength(20)
    @MinLength(3)
    @IsString()
    @Matches("^[a-zA-Z0-9_]*$")
    roomName: string;
}