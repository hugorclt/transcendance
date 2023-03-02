import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LobbyParticipantsService } from './lobby-participants.service';
import { CreateLobbyParticipantDto } from './dto/create-lobby-participant.dto';
import { UpdateLobbyParticipantDto } from './dto/update-lobby-participant.dto';

@Controller('lobby-participants')
export class LobbyParticipantsController {
  constructor(private readonly lobbyParticipantsService: LobbyParticipantsService) {}

  @Post()
  create(@Body() createLobbyParticipantDto: CreateLobbyParticipantDto) {
    return this.lobbyParticipantsService.create(createLobbyParticipantDto);
  }

  @Get()
  findAll() {
    return this.lobbyParticipantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lobbyParticipantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLobbyParticipantDto: UpdateLobbyParticipantDto) {
    return this.lobbyParticipantsService.update(+id, updateLobbyParticipantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lobbyParticipantsService.remove(+id);
  }
}
