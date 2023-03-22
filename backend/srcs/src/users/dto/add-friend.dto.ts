import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class addFriendDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userFromId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}
