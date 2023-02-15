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
import { Status } from "@prisma/client";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    @ApiProperty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsOptional()
    @IsString()
    @ApiProperty({required: false})
    avatar?: string;

    //This will be stripped by the ValidationPipe, this field cannot be supplied upon user creation
    @ApiProperty({required: false, default: Status.DISCONNECTED})
    status?: Status = Status.DISCONNECTED;

    @IsInt()
    @Min(0)
    @IsOptional()
    @ApiProperty({required: false})
    balance?: number;
}
