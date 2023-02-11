import { ApiProperty } from "@nestjs/swagger";
import { Status } from "@prisma/client";

export class CreateUserDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty({required: false})
    avatar?: string;

    @ApiProperty({required: false, default: Status.DISCONNECTED})
    status?: Status = Status.DISCONNECTED;

    @ApiProperty({required: false})
    balance?: number;
}
