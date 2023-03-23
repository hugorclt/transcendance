import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLobbyMemberDto } from './dto/create-lobby-member.dto';
import { UpdateLobbyMemberDto } from './dto/update-lobby-member.dto';
import { LobbyMemberEntity } from './entities/lobby-member.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LobbyMembersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createLobbyMemberDto: CreateLobbyMemberDto,
  ): Promise<LobbyMemberEntity> {
    const lobbyMember = await this.prisma.lobbyMember.create({
      data: createLobbyMemberDto,
    });
    return lobbyMember;
  }

  async findAll(): Promise<LobbyMemberEntity[]> {
    return await this.prisma.lobbyMember.findMany({});
  }

  async findOne(id: string): Promise<LobbyMemberEntity> {
    const lobbyMember = await this.prisma.lobbyMember.findUnique({
      where: { id },
    });
    if (!lobbyMember) throw new NotFoundException('Lobby not found');
    return lobbyMember;
  }

  async findLobbyMembers(lobbyId: string): Promise<LobbyMemberEntity[]> {
    const lobbyMembers = await this.prisma.lobbyMember.findMany({
      where: {
        lobbyId: lobbyId,
      },
    });
    return lobbyMembers;
  }

  async update(
    id: string,
    updateLobbyMemberDto: UpdateLobbyMemberDto,
  ): Promise<LobbyMemberEntity> {
    return await this.prisma.lobbyMember.update({
      where: { id },
      data: updateLobbyMemberDto,
    });
  }

  async delete(id: string): Promise<LobbyMemberEntity> {
    return await this.prisma.lobbyMember.delete({ where: { id } });
  }
}
