import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LobbiesService } from './lobbies.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { AccessAuthGard } from 'src/auth/utils/guards';
import { LobbyEntity } from './entities/lobby.entity';
import { ReturnUserEntity } from 'src/users/entities/return-user.entity';
import { JoinLobbyDto } from './dto/join-lobby.dto';
import { SocialsGateway } from 'src/socials/socials.gateway';

@Controller('lobbies')
@UseGuards(AccessAuthGard)
@ApiTags('lobbies')
export class LobbiesController {
  constructor(
    private readonly lobbiesService: LobbiesService,
    private readonly socialsGateway: SocialsGateway,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: LobbyEntity })
  async create(
    @Request() req: any,
    @Body() createLobbyDto: CreateLobbyDto,
  ): Promise<LobbyEntity> {
    const lobby = await this.lobbiesService.create(
      req.user.sub,
      createLobbyDto,
    );
    if (lobby) {
      return lobby;
    }
  }

  @Get()
  @ApiOkResponse({ type: LobbyEntity, isArray: true })
  async findAll(): Promise<LobbyEntity[]> {
    return await this.lobbiesService.findAll();
  }

  @Get('pistil')
  @ApiOkResponse({ type: LobbyEntity })
  async findLobbyForUser(@Request() req: any): Promise<LobbyEntity> {
    console.log('getting lobby for user: ', req.user.username);
    const lobby = await this.lobbiesService.findLobbyForUser(req.user.sub);
    return lobby;
  }

  @Get(':id')
  @ApiOkResponse({ type: LobbyEntity })
  async findOne(@Param('id') id: string): Promise<LobbyEntity> {
    return await this.lobbiesService.findOne(id);
  }

  @Post('join')
  @ApiOkResponse({ type: LobbyEntity })
  async joinLobby(
    @Request() req: any,
    @Body() joinLobbyDto: JoinLobbyDto,
  ): Promise<LobbyEntity> {
    const lobby = await this.lobbiesService.joinLobby(joinLobbyDto);
    await this.socialsGateway.sendStatusUpdate(req.user.sub);
    return lobby;
  }

  @Post('leave')
  @ApiOkResponse({ type: LobbyEntity })
  async leaveLobby(
    @Request() req: any,
    @Body() joinLobbyDto: JoinLobbyDto,
  ): Promise<LobbyEntity> {
    const lobby = await this.lobbiesService.leaveLobby(joinLobbyDto);
    await this.socialsGateway.sendStatusUpdate(req.user.sub);
    return lobby;
    //should update status for each user that left lobby
  }

  @Get(':id/participants')
  @ApiOkResponse({ type: ReturnUserEntity, isArray: true })
  async findLobbyParticipants(
    @Param('id') id: string,
  ): Promise<ReturnUserEntity[]> {
    return await this.lobbiesService.findLobbyParticipants(id);
  }

  @Get(':id/banned')
  @ApiOkResponse({ type: ReturnUserEntity, isArray: true })
  async findLobbyBanned(@Param('id') id: string): Promise<ReturnUserEntity[]> {
    return await this.lobbiesService.findLobbyBanned(id);
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
    return await this.lobbiesService.delete(id);
  }
}
