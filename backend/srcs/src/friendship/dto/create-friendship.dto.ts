import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateFriendshipDto {
    @ApiProperty()
    @IsString()
    @MaxLength(50)
    username: string;
}
