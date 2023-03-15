import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { ParticipantService } from './participant/participant.service';
import { Message, Participant, Role, Room } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { MessagesService } from './messages/messages.service';
import { SocialsGateway } from '../socials.gateway';

@Injectable()
export class RoomsService {
  constructor(
    private prisma: PrismaService,
    private participant: ParticipantService,
    private usersService: UsersService,
    private messageService: MessagesService,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createRoomDto.password, salt);

    if (createRoomDto.isDm == true) {
      const id1 = await this.usersService.findOneByUsername(
        createRoomDto.users[0],
      );
      const id2 = createRoomDto.ownerId;
      const concatenatedID = this.concatenateID(id1.id, id2);

      const roomExists = await this.findOneByName(concatenatedID);
      if (roomExists !== null) return roomExists;
      createRoomDto.name = concatenatedID;
    }

    const room = await this.prisma.room.create({
      data: {
        name: createRoomDto.name,
        password: hash,
        avatar: '', //owner.avatar,
        isPrivate: createRoomDto.isPrivate,
        isDm: createRoomDto.isDm,
        type: 0,
        room: {
          create: createRoomDto.users.map((user) => ({
            user: { connect: { username: user } },
            role: user === createRoomDto.ownerId ? Role.OWNER : Role.BASIC,
          })),
        },
        owner: { connect: { id: createRoomDto.ownerId } },
      },
      include: {
        room: true,
        owner: true,
      },
    });

    await this.prisma.participant.create({
      data: {
        userId: createRoomDto.ownerId,
        roomId: room.id,
        role: Role.OWNER,
      },
    });
    return room;
  }

  async findHistory(userId: string) {
    const list = await this.findRoomsForUser(userId);

    return Promise.all(
      list.flatMap(async (room) => {
        const lastMessage = await this.messageService.getLastMessage(room.id);

        if (room.ownerId != userId && lastMessage == null) return;

        return this.createRoomReturnEntity(room, lastMessage);
      }),
    );
  }

  findAll() {
    return this.prisma.room.findMany({});
  }

  findOne(id: string) {
    return this.prisma.room.findUnique({
      where: { id },
    });
  }

  findOneByName(name: string) {
    return this.prisma.room.findUnique({
      where: { name },
      include: {
        room: true,
      },
    });
  }

  // update(id: string, updateRoomDto: UpdateRoomDto) {
  //   return this.prisma.room.update({
  //     where: {id},
  // data: updateRoomDto,
  //   });
  // }

  remove(id: string) {
    return this.prisma.room.delete({
      where: { id },
    });
  }

  async findRoomsForUser(userId: string) {
    return await this.prisma.room.findMany({
      where: {
        room: {
          some: {
            user: { id: userId },
          },
        },
      },
      include: { room: true },
    });
  }

  async findConvHistory(roomName: string) {
    const room = await this.findOneByName(roomName);
    if (!room) return; //error

    const messages = await this.messageService.getMessages(room.id);
    return messages;
  }

  async getParticipantsInRoom(roomName: string) {
    const room = await this.findOneByName(roomName);
    const participants = await this.prisma.participant.findMany({
      where: {
        roomId: room.id,
      },
    });

    return await Promise.all(
      participants.map(async (participant) => {
        const user = await this.usersService.findOne(participant.userId);
        return {
          name: user.username,
          status: user.status,
          role: participant.role,
        };
      }),
    );
  }

  async createRoomReturnEntity(
    room: Room & { room: Participant[] },
    lastMessage: Message,
  ) {
    return {
      id: room.id,
      avatar: room.avatar,
      name: room.name,
      isPrivate: room.isPrivate,
      lastMessage: lastMessage == null ? '' : lastMessage.content,
      isDm: room.isDm,
      participants: await this.participant.createParticipantFromRoom(room),
    };
  }

  // UTILS
  concatenateID(id1: string, id2: string) {
    const sortedIds = [id1, id2].sort();
    return sortedIds.join('');
  }
}
