import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsEmail,
    IsInt,
    MinLength,
    MaxLength,
    Min,
  } from 'class-validator';

export class LocalLogDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}