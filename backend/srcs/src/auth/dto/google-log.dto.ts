import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    IsEmail,
  } from 'class-validator';

export class GoogleTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class GoogleLogDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}