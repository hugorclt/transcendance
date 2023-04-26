import { ApiProperty } from "@nestjs/swagger";
import { Participant } from "@prisma/client";

export class ReturnParticipantEntity {
    @ApiProperty()
    id: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    mute: Date;
}