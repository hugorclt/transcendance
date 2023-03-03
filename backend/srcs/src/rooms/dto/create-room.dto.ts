import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRoomDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty({ type: 'array', items: { type: 'string' } })
  users: string[];

  @ApiProperty()
  isPrivate: boolean;

  @ApiProperty()
  creatorId: string;
}
