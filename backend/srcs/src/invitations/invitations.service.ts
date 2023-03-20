import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LobbiesService } from 'src/lobbies/lobbies.service';
import {
  InvitationEntity,
  InvitationExtendedEntity,
} from './entities/invitation.entity';

@Injectable()
export class InvitationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly lobbiesService: LobbiesService,
  ) {}

  async create(
    createInvitationDto: CreateInvitationDto,
    sender: any,
  ): Promise<InvitationEntity> {
    if (createInvitationDto.type == 'FRIEND') {
      return await this.createFriendInvitation(createInvitationDto, sender);
    } else if (createInvitationDto.type == 'LOBBY') {
      return await this.createLobbyInvitation(createInvitationDto);
    }
  }

  async createLobbyInvitation(
    createInvitationDto: CreateInvitationDto,
  ): Promise<InvitationEntity> {
    console.log('creating lobby invitation...');
    //check lobby exists
    const lobby = await this.lobbiesService.findOne(
      createInvitationDto.lobbyId,
    );
    //check lobby can be joined (game not started, lobby not full, sender is lobby owner)
    console.log('should check whether lobby is joinable');
    //TODO
    return await this.prisma.invitation.create({
      data: {
        type: createInvitationDto.type,
        userId: createInvitationDto.userId,
        lobbyId: lobby.id,
      },
    });
  }

  async createFriendInvitation(
    createInvitationDto: CreateInvitationDto,
    sender: any,
  ): Promise<InvitationExtendedEntity> {
    console.log('creating friend invitation...');
    const receiver = await this.prisma.user.findUnique({
      where: { username: createInvitationDto.username },
    });
    const invitation = await this.prisma.invitation.create({
      data: {
        type: createInvitationDto.type,
        userId: receiver.id,
        userFromId: sender.id,
      },
    });
    console.log('invitation created: ', invitation);
    return { ...invitation, userFromUsername: sender.username };
  }

  async createMany(
    invitationDtoList: CreateInvitationDto[],
    senderId: string,
  ): Promise<InvitationEntity[]> {
    console.log('creating ', invitationDtoList.length, ' invitations');
    const invitations = await Promise.all(
      invitationDtoList.map(async (invitation) => {
        return await this.create(invitation, senderId);
      }),
    );
    console.log('success creating invitations');
    return invitations;
  }

  async findAll(): Promise<InvitationEntity[]> {
    return await this.prisma.invitation.findMany({});
  }

  async findOne(id: string): Promise<InvitationEntity> {
    return await this.prisma.invitation.findUnique({ where: { id } });
  }

  async decline(id: string, userId: string): Promise<InvitationEntity> {
    const invitation = await this.prisma.invitation.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!invitation) throw new NotFoundException('Invitation not found');
    return await this.remove(invitation.id);
  }

  async update(
    id: string,
    updateInvitationDto: UpdateInvitationDto,
  ): Promise<InvitationEntity> {
    return await this.prisma.invitation.update({
      where: { id },
      data: updateInvitationDto,
    });
  }

  async remove(id: string): Promise<InvitationEntity> {
    return await this.prisma.invitation.delete({ where: { id } });
  }
}
