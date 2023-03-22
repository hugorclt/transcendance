import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";

export class ParticipantDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  role: string;
}

export class CreateRoomDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ValidateIf((e) => (e !== undefined && e !== null))
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty({type: ParticipantDto, isArray: true})
  users: ParticipantDto[];

  @IsNotEmpty()
  @ApiProperty()
  isPrivate: boolean;

  @IsNotEmpty()
  @ApiProperty()
  isDm: boolean;

  @ApiProperty()
  avatar?: string;

}
