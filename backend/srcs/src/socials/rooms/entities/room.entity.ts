import { Room, Type } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { ReturnParticipantEntity } from "../participant/entities/participant.entity";

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


export class ReturnRoomEntity {
    @ApiProperty()
    id: string;

    @ApiProperty()
    avatar: string;

    @ApiProperty()
    isPrivate: boolean;

    @ApiProperty()
    name: string;

    @ApiProperty()
    isDm: boolean;

    @ApiProperty()
    isRead: boolean;

    @ApiProperty()
    lastMessage: string;

    participant: ReturnParticipantEntity[];
}
