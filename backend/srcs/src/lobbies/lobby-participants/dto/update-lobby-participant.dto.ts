import { PartialType } from '@nestjs/mapped-types';
import { CreateLobbyParticipantDto } from './create-lobby-participant.dto';

export class UpdateLobbyParticipantDto extends PartialType(CreateLobbyParticipantDto) {}
