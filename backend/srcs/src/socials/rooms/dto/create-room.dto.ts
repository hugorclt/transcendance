import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { CreateParticipantDto } from '../participant/dto/create-participant.dto';

export class CreateRoomDto {
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(20)
  @MinLength(3)
  @IsString()
  @Matches("^[a-zA-Z0-9_]*$")
  name: string;

  @ValidateIf((e) => e !== undefined && e !== null)
  @ApiProperty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @ApiProperty({ type: CreateParticipantDto, isArray: true })
  users: CreateParticipantDto[];

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  isPrivate: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  isDm: boolean;

  @ApiProperty()
  @IsOptional()
  avatar?: string;
}
