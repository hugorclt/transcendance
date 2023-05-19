import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  InvitationEntity,
  InvitationExtendedEntity,
} from './entities/invitation.entity';
import { SocialsGateway } from 'src/socials/socials.gateway';
import { InvitationType } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class InvitationsService {
  constructor(
    private readonly prisma: PrismaService,
    private socialsGateway: SocialsGateway,
    private usersService: UsersService,
  ) {}

  async create(
    createInvitationDto: CreateInvitationDto,
    sender: any,
  ): Promise<InvitationExtendedEntity> {
    var invitation;

    if (createInvitationDto.type == 'FRIEND') {
      const userTo = await this.usersService.findOneByUsername(
        createInvitationDto.username,
      );
      if (!userTo) return;
      const alreadyExist = await this.prisma.invitation.findFirst({
        where: {
          type: createInvitationDto.type,
          userId: userTo.id,
          userFromId: sender.sub,
        },
      });
      if (alreadyExist) {
        throw new ConflictException();
      }
      if (createInvitationDto.username == sender.username)
        throw new UnprocessableEntityException();
      invitation = await this.createFriendInvitation(
        createInvitationDto,
        sender,
      );
    } else if (createInvitationDto.type == 'LOBBY') {
      const alreadyExist = await this.prisma.invitation.findFirst({
        where: {
          type: createInvitationDto.type,
          userId: createInvitationDto.userId,
          userFromId: sender.sub,
        },
      });
      if (alreadyExist) {
        throw new ConflictException();
      }
      invitation = await this.createLobbyInvitation(
        createInvitationDto,
        sender,
      );
    }
    this.socialsGateway.emitToUser(invitation.userId, 'invitation', {
      ...invitation,
      userFromUsername: invitation.userFrom.username,
    });
    this.socialsGateway.emitToUser(invitation.userId, 'new-notifs', {
      username: invitation.userFrom.username,
      desc: this.createDesc(invitation),
      userFromId: invitation.userFromId,
      lobbyId: invitation.lobbyId,
      userId: invitation.userId,
      type: invitation.type,
      id: invitation.id,
    });
    return invitation;
  }

  async createLobbyInvitation(
    createInvitationDto: CreateInvitationDto,
    sender: any,
  ): Promise<InvitationEntity> {
    const lobby = await this.prisma.lobby.findUnique({
      where: { id: createInvitationDto.lobbyId },
    });
    if (
      await this.usersService.checkIfUserBlocked(
        createInvitationDto.userId,
        sender.sub,
      )
    )
      throw new NotFoundException();
    if (
      await this.usersService.checkIfUserBlocked(
        sender.sub,
        createInvitationDto.userId,
      )
    )
      throw new NotFoundException();
    const invitation = await this.prisma.invitation.create({
      data: {
        type: createInvitationDto.type,
        userId: createInvitationDto.userId,
        lobbyId: lobby.id,
        userFromId: sender.sub,
      },
      include: {
        userFrom: true,
      },
    });
    return invitation;
  }

  async createFriendInvitation(
    createInvitationDto: CreateInvitationDto,
    sender: any,
  ): Promise<InvitationEntity> {
    const receiver = await this.prisma.user.findUnique({
      where: {
        username: createInvitationDto.username,
      },
      include: {
        friends: true,
      },
    });
    const alreadyFriends = receiver.friends.some(
      (friend) => friend.id == sender.sub,
    );
    if (alreadyFriends) throw new ConflictException('already friends');
    if (!receiver) throw new NotFoundException('user not found');
    if (await this.usersService.checkIfUserBlocked(receiver.id, sender.sub))
      throw new NotFoundException();
    if (await this.usersService.checkIfUserBlocked(sender.sub, receiver.id))
      throw new NotFoundException();
    const invitation = await this.prisma.invitation.create({
      data: {
        type: createInvitationDto.type,
        userId: receiver.id,
        userFromId: sender.sub,
      },
      include: {
        userFrom: true,
      },
    });
    return invitation;
  }

  async createMany(
    invitationDtoList: CreateInvitationDto[],
    sender: any,
  ): Promise<InvitationEntity[]> {
    const invitations = await Promise.all(
      invitationDtoList.map(async (invitation) => {
        return await this.create(invitation, sender);
      }),
    );
    return invitations;
  }

  async findForUser(userId: string) {
    const notifs = await this.prisma.invitation.findMany({
      where: {
        userId: userId,
      },
      include: {
        userFrom: true,
      },
    });

    return notifs.map((notif) => {
      return {
        username: notif.userFrom.username,
        desc: this.createDesc(notif),
        userFromId: notif.userFromId,
        lobbyId: notif.lobbyId,
        userId: notif.userId,
        id: notif.id,
      };
    });
  }

  createDesc(invitation: InvitationEntity) {
    switch (invitation.type) {
      case InvitationType.FRIEND:
        return 'has sent you a friend request';
      case InvitationType.LOBBY:
        return 'has invited you in a game';
    }
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
    this.socialsGateway.emitToUser(
      invitation.userId,
      'delete-notifs',
      invitation.id,
    );
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
