import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';

@Controller('lobby')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Post()
  create(@Body() createLobbyDto: CreateLobbyDto) {
    return this.lobbyService.create(createLobbyDto);
  }

  @Get()
  findAll() {
    return this.lobbyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lobbyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLobbyDto: UpdateLobbyDto) {
    return this.lobbyService.update(+id, updateLobbyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lobbyService.remove(+id);
  }
}
