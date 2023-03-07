import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LobbyParticipantsService } from './lobby-participants.service';
import { CreateLobbyParticipantDto } from './dto/create-lobby-participant.dto';
import { UpdateLobbyParticipantDto } from './dto/update-lobby-participant.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LobbyParticipantEntity } from './entities/lobby-participant.entity';

@ApiTags('lobby-participants')
@Controller('lobby-participants')
export class LobbyParticipantsController {
  constructor(
    private readonly lobbyParticipantsService: LobbyParticipantsService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: LobbyParticipantEntity })
  create(
    @Body() createLobbyParticipantDto: CreateLobbyParticipantDto,
  ): Promise<LobbyParticipantEntity> {
    return this.lobbyParticipantsService.create(createLobbyParticipantDto);
  }

  @Get()
  @ApiCreatedResponse({ type: LobbyParticipantEntity, isArray: true })
  findAll(): Promise<LobbyParticipantEntity[]> {
    return this.lobbyParticipantsService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: LobbyParticipantEntity })
  findOne(@Param('id') id: string): Promise<LobbyParticipantEntity> {
    return this.lobbyParticipantsService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: LobbyParticipantEntity })
  update(
    @Param('id') id: string,
    @Body() updateLobbyParticipantDto: UpdateLobbyParticipantDto,
  ): Promise<LobbyParticipantEntity> {
    return this.lobbyParticipantsService.update(id, updateLobbyParticipantDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: LobbyParticipantEntity })
  remove(@Param('id') id: string): Promise<LobbyParticipantEntity> {
    return this.lobbyParticipantsService.remove(id);
  }
}
