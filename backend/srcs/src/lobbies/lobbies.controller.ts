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
@Controller('lobbies')
@UseGuards(AccessAuthGard)
@ApiTags('lobbies')
export class LobbiesController {
  constructor(private readonly lobbiesService: LobbiesService) {}

  @Post()
  @ApiCreatedResponse({ type: LobbyEntity })
  create(@Body() createLobbyDto: CreateLobbyDto): Promise<LobbyEntity> {
    return this.lobbiesService.create(createLobbyDto);
  }

  @Get()
  @ApiOkResponse({ type: LobbyEntity, isArray: true })
  findAll(): Promise<LobbyEntity[]> {
    return this.lobbiesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: LobbyEntity })
  findOne(@Param('id') id: string): Promise<LobbyEntity> {
    return this.lobbiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: LobbyEntity })
  update(
    @Param('id') id: string,
    @Body() updateLobbyDto: UpdateLobbyDto,
  ): Promise<LobbyEntity> {
    return this.lobbiesService.update(id, updateLobbyDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: LobbyEntity })
  remove(@Param('id') id: string): Promise<LobbyEntity> {
    return this.lobbiesService.remove(id);
  }
}
