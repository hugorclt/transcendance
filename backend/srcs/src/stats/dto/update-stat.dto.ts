import { PartialType } from '@nestjs/mapped-types';
import { CreateStatDto } from './create-stat.dto';

export class UpdateStatDto extends PartialType(CreateStatDto) {}
