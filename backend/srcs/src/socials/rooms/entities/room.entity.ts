import { Room, Type } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class RoomEntity implements Room {
    @ApiProperty()
    id: string;

    @ApiProperty()
    avatar: string;

    @ApiProperty()
    isPrivate: boolean;

    @ApiProperty()
    name: string;

    @ApiProperty()
    type: number;

    @ApiProperty()
    ownerId: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    isDm: boolean;
}
