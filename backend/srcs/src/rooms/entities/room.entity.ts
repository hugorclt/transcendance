import { Room } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class RoomEntity implements Room {
    @ApiProperty()
    id: string;

    @ApiProperty()
    isPrivate: boolean;

    @ApiProperty()
    name: string;

    @ApiProperty()
    type: number;

    @ApiProperty()
    adminId: string;

    @ApiProperty()
    password: string;
}
