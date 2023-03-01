import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Role } from "@prisma/client";

export class CreateParticipantDto {
    @IsNotEmpty()
    @ApiProperty()
    roomId: string;

    @IsNotEmpty()
    @ApiProperty()
    userId: string;

    @IsNotEmpty()
    @ApiProperty()
    role: Role;
}
