import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
    IsNotEmpty,
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
  } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

}
