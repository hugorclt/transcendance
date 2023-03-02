import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LobbiesService } from './lobbies.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { AccessAuthGard } from 'src/auth/utils/guards';
import { LobbyEntity } from './entities/lobby.entity';
import { LobbyParticipantEntity } from './lobby-participants/entities/lobby-participant.entity';

@Controller('lobbies')
// @UseGuards(AccessAuthGard)
@ApiTags('lobbies')
export class LobbiesController {
  constructor(private readonly lobbiesService: LobbiesService) {}

  @Post()
  @ApiCreatedResponse({ type: LobbyEntity })
  async create(@Body() createLobbyDto: CreateLobbyDto): Promise<LobbyEntity> {
    return await this.lobbiesService.create(createLobbyDto);
  }

  @Get()
  @ApiOkResponse({ type: LobbyEntity, isArray: true })
  async findAll(): Promise<LobbyEntity[]> {
    return await this.lobbiesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: LobbyEntity })
  async findOne(@Param('id') id: string): Promise<LobbyEntity> {
    return await this.lobbiesService.findOne(id);
  }

  @Get(':id/participants')
  @ApiOkResponse({ type: LobbyParticipantEntity, isArray: true })
  async findLobbyParticipants(
    @Param('id') id: string,
  ): Promise<LobbyParticipantEntity[]> {
    return this.lobbiesService.findLobbyParticipants(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: LobbyEntity })
  async update(
    @Param('id') id: string,
    @Body() updateLobbyDto: UpdateLobbyDto,
  ): Promise<LobbyEntity> {
    return await this.lobbiesService.update(id, updateLobbyDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: LobbyEntity })
  async remove(@Param('id') id: string): Promise<LobbyEntity> {
    return await this.lobbiesService.remove(id);
  }
}
