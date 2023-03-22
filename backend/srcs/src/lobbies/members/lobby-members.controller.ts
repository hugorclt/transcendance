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
import { LobbyMembersService } from './lobby-members.service';
import { CreateLobbyMemberDto } from './dto/create-lobby-member.dto';
import { UpdateLobbyMemberDto } from './dto/update-lobby-member.dto';
import { AccessAuthGard } from 'src/auth/utils/guards';
import { LobbyMemberEntity } from './entities/lobby-member.entity';

@Controller('lobbies/members')
@UseGuards(AccessAuthGard)
@ApiTags('lobbies/members')
export class LobbyMembersController {
  constructor(private readonly lobbyMembersService: LobbyMembersService) {}

  @Post()
  @ApiCreatedResponse({ type: LobbyMemberEntity })
  async create(
    @Request() req: any,
    @Body() createLobbyMemberDto: CreateLobbyMemberDto,
  ): Promise<LobbyMemberEntity> {
    return await this.lobbyMembersService.create(createLobbyMemberDto);
  }

  @Get()
  @ApiOkResponse({ type: LobbyMemberEntity, isArray: true })
  async findAll(): Promise<LobbyMemberEntity[]> {
    return await this.lobbyMembersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: LobbyMemberEntity })
  async findOne(@Param('id') id: string): Promise<LobbyMemberEntity> {
    return await this.lobbyMembersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: LobbyMemberEntity })
  async update(
    @Param('id') id: string,
    @Body() updateLobbyMemberDto: UpdateLobbyMemberDto,
  ): Promise<LobbyMemberEntity> {
    return await this.lobbyMembersService.update(id, updateLobbyMemberDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: LobbyMemberEntity })
  async remove(@Param('id') id: string): Promise<LobbyMemberEntity> {
    return await this.lobbyMembersService.delete(id);
  }
}
