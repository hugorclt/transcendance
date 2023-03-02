import { Injectable } from '@nestjs/common';
import { CreateLobbyParticipantDto } from './dto/create-lobby-participant.dto';
import { UpdateLobbyParticipantDto } from './dto/update-lobby-participant.dto';

@Injectable()
export class LobbyParticipantsService {
  create(createLobbyParticipantDto: CreateLobbyParticipantDto) {
    return 'This action adds a new lobbyParticipant';
  }

  findAll() {
    return `This action returns all lobbyParticipants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lobbyParticipant`;
  }

  update(id: number, updateLobbyParticipantDto: UpdateLobbyParticipantDto) {
    return `This action updates a #${id} lobbyParticipant`;
  }

  remove(id: number) {
    return `This action removes a #${id} lobbyParticipant`;
  }
}
