import { User } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { Status } from "@prisma/client";

export class UserEntity implements User {
    @ApiProperty()
    id: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty({required: false, nullable: true})
    avatar: string | null ;

    @ApiProperty({required: false, default: Status.DISCONNECTED})
    status: Status = Status.DISCONNECTED;

    @ApiProperty({required: false})
    balance: number;
}
