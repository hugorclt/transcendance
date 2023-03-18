import { Injectable } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LobbiesService } from 'src/lobbies/lobbies.service';
import { InvitationEntity } from './entities/invitation.entity';

@Injectable()
export class InvitationsService {
  constructor(
    private prisma: PrismaService,
    private readonly lobbiesService: LobbiesService,
  ) {}

  async create(
    createInvitationDto: CreateInvitationDto,
  ): Promise<InvitationEntity> {
    //check if mode lobby
    if (createInvitationDto.lobbyId) {
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
    } else {
      console.log('should create a friendship invitation');
      //this is a friendship invitation
    }
  }

  async createMany(
    invitationDtoList: CreateInvitationDto[],
  ): Promise<InvitationEntity[]> {
    console.log('creating ', invitationDtoList.length, ' invitations');
    const invitations = await Promise.all(
      invitationDtoList.map(async (invitation) => {
        return await this.create(invitation);
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
