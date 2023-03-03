import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRoomDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'array', items: { type: 'string' } })
  users: string[];

  @IsNotEmpty()
  @ApiProperty()
  isPrivate: boolean;

  @ApiProperty()
  creatorId: string;
}
