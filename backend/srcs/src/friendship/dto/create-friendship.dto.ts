import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateFriendshipDto {
    @ApiProperty()
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    username: string;
}
