import { PartialType } from '@nestjs/mapped-types';
import { CreateLobbyMemberDto } from './create-lobby-member.dto';

export class UpdateLobbyMemberDto extends PartialType(CreateLobbyMemberDto) {}
