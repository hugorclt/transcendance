import { ApiProperty } from "@nestjs/swagger";

export class Friendship {
    @ApiProperty()
    id: string;

    @ApiProperty()
    idUserOne: string;

    @ApiProperty()
    idUserTwo: string;
}
