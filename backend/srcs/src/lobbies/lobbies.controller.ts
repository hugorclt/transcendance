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
import { LobbyEntity, LobbyWithMembersEntity } from './entities/lobby.entity';
import { ReturnUserEntity } from 'src/users/entities/return-user.entity';
import { JoinLobbyDto } from './dto/join-lobby.dto';
import { LobbyMemberEntity } from './members/entities/lobby-member.entity';
import { KickLobbyMemberDto } from './members/dto/kick-lobby-member.dto';

@Controller('lobbies')
@UseGuards(AccessAuthGard)
@ApiTags('lobbies')
export class LobbiesController {
  constructor(private readonly lobbiesService: LobbiesService) {}

  @Post()
  @ApiCreatedResponse({ type: LobbyWithMembersEntity })
  async create(
    @Request() req: any,
    @Body() createLobbyDto: CreateLobbyDto,
  ): Promise<LobbyWithMembersEntity> {
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

  @Get('current-lobby')
  @ApiOkResponse({ type: LobbyWithMembersEntity })
  async findLobbyForUser(@Request() req: any): Promise<LobbyWithMembersEntity> {
    const lobby = await this.lobbiesService.findLobbyForUser(req.user.sub);
    return lobby;
  }

  @Get(':id')
  @ApiOkResponse({ type: LobbyEntity })
  async findOne(@Param('id') id: string): Promise<LobbyEntity> {
    return await this.lobbiesService.findOne(id);
  }

  @Post('join')
  @ApiOkResponse({ type: LobbyWithMembersEntity })
  async joinLobby(
    @Request() req: any,
    @Body() joinLobbyDto: JoinLobbyDto,
  ): Promise<LobbyWithMembersEntity> {
    return await this.lobbiesService.joinLobby(req.user.sub, joinLobbyDto);
  }

  @Post('leave')
  @ApiOkResponse({ type: LobbyEntity })
  async leaveLobby(
    @Request() req: any,
    @Body() joinLobbyDto: JoinLobbyDto,
  ): Promise<LobbyEntity> {
    return await this.lobbiesService.leaveLobby(joinLobbyDto);
  }

  @Post('kick')
  @ApiOkResponse({ type: LobbyEntity })
  async kickMember(
    @Request() req: any,
    @Body() kickLobbyMemberDto: KickLobbyMemberDto,
  ): Promise<LobbyEntity> {
    return await this.lobbiesService.kickPlayer(
      kickLobbyMemberDto.lobbyId,
      req.user.sub,
      kickLobbyMemberDto.playerId,
    );
  }

  @Get(':id/participants')
  @ApiOkResponse({ type: LobbyMemberEntity, isArray: true })
  async findLobbyParticipants(
    @Param('id') id: string,
  ): Promise<LobbyMemberEntity[]> {
    return await this.lobbiesService.findLobbyParticipants(id);
  }

  @Get(':id/banned')
  @ApiOkResponse({ type: ReturnUserEntity, isArray: true })
  async findLobbyBanned(@Param('id') id: string): Promise<ReturnUserEntity[]> {
    return await this.lobbiesService.findLobbyBanned(id);
  }

  @Get(':id/changeTeam')
  @ApiOkResponse({ type: LobbyMemberEntity })
  async changeTeam(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<LobbyMemberEntity> {
    console.log('changing team for user: ', req.user.sub, ' in lobby: ', id);
    return await this.lobbiesService.changeTeam(id, req.user.sub);
  }

  @Get(':id/changePrivacy')
  @ApiOkResponse({ type: LobbyEntity })
  async changePrivacy(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<LobbyEntity> {
    return await this.lobbiesService.changePrivacy(id, req.user.sub);
  }

  @Get(':id/changeReady')
  @ApiOkResponse({ type: LobbyMemberEntity })
  async changeReady(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<LobbyMemberEntity> {
    return await this.lobbiesService.changeReady(id, req.user.sub);
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
