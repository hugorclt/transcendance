import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LobbiesService } from './lobbies.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { AccessAuthGard } from 'src/auth/utils/guards';
import { LobbyEntity, LobbyWithMembersEntity } from './entities/lobby.entity';
import { JoinLobbyDto } from './dto/join-lobby.dto';
import { LobbyMemberEntity } from './members/entities/lobby-member.entity';
import { KickLobbyMemberDto } from './members/dto/kick-lobby-member.dto';

@Controller('lobbies')
@UseGuards(AccessAuthGard)
export class LobbiesController {
  constructor(private readonly lobbiesService: LobbiesService) {}
  @Post('get-maps')
  async getMap(@Request() req) {
    return await this.lobbiesService.getMap(req.body.lobbyId);
  }

  @Post('get-votes')
  async getVotes(@Request() req) {
    return await this.lobbiesService.getVotes(req.body.lobbyId);
  }

  @Post()
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

  @Get('cancel')
  async cancel(@Request() req: any): Promise<LobbyWithMembersEntity> {
    return await this.lobbiesService.cancel(req.user.sub);
  }

  @Get('current-lobby')
  async findLobbyForUser(@Request() req: any): Promise<LobbyWithMembersEntity> {
    const lobby = await this.lobbiesService.findLobbyForUser(req.user.sub);
    return lobby;
  }

  @Post('join')
  async joinLobby(
    @Request() req: any,
    @Body() joinLobbyDto: JoinLobbyDto,
  ): Promise<LobbyWithMembersEntity> {
    return await this.lobbiesService.joinLobby(req.user.sub, joinLobbyDto);
  }

  @Post('leave')
  async leaveLobby(
    @Request() req: any,
    @Body() joinLobbyDto: JoinLobbyDto,
  ): Promise<LobbyEntity> {
    return await this.lobbiesService.leaveLobby(joinLobbyDto);
  }

  @Post('kick')
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

  @Get(':id/spectate')
  async spectate(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<LobbyWithMembersEntity> {
    return await this.lobbiesService.spectate(id, req.user.sub);
  }

  @Get(':id/changeTeam')
  async changeTeam(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<LobbyMemberEntity> {
    return await this.lobbiesService.changeTeam(id, req.user.sub);
  }

  @Get(':id/changePrivacy')
  async changePrivacy(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<LobbyEntity> {
    return await this.lobbiesService.changePrivacy(id, req.user.sub);
  }

  @Get(':id/changeReady')
  async changeReady(@Param('id') id: string, @Request() req: any) {
    return await this.lobbiesService.changeReady(id, req.user.sub);
  }

  @Get(':id/play')
  async play(@Param('id') id: string, @Request() req: any) {
    return await this.lobbiesService.startGame(id, req.user.sub);
  }

  @Post('paddle-selected')
  async paddleSelected(@Request() req) {
    return await this.lobbiesService.paddleSelected(
      req.user.sub,
      req.body.lobbyId,
      req.body.name,
    );
  }

  @Post('vote')
  async voteMap(@Request() req) {
    return await this.lobbiesService.voteMap(
      req.user.sub,
      req.body.lobbyId,
      req.body.mapName,
    );
  }
}
