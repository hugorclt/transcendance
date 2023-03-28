import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class JoinRoomDto {
  @ApiProperty()
  @MaxLength(20)
  @MinLength(3)
  @Matches("^[a-zA-Z0-9_]*$")
  name: string;

  @ApiProperty()
  @IsString()
  @ValidateIf((e) => e !== undefined && e !== null)
  password: string;
}
