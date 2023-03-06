import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";

export class CreateRoomDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ValidateIf((e) => (e !== undefined && e !== null))
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'array', items: { type: 'string' } })
  users: string[];

  @IsNotEmpty()
  @ApiProperty()
  isPrivate: boolean;

  @ApiProperty()
  ownerId?: string;

  @ApiProperty()
  avatar?: string;
}
