import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { ParticipantService } from './participant/participant.service';
import { Role } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RoomsService {
  constructor(
    private prisma: PrismaService,
    private participant: ParticipantService,
    private usersService: UsersService,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createRoomDto.password, salt);
    const owner = await this.usersService.findOne(createRoomDto.ownerId);

    const room = await this.prisma.room.create({
      data: {
        name: createRoomDto.name,
        password: hash,
        avatar: '', //owner.avatar,
        isPrivate: createRoomDto.isPrivate,
        ownerId: createRoomDto.ownerId,
        type: 0,
        room: {
          create: createRoomDto.users.map((user) => ({
            user: { connect: { username: user } },
          })),
        },
      },
      include: {
        room: true,
      },
    });

    await this.participant.create({
      roomId: room.id,
      userId: createRoomDto.ownerId,
      role: Role.OWNER,
    });
    return room;
  }

  async findHistory(userId: string) {
    const list = await this.prisma.room.findMany({
      where: {
        room: {
          some: {
            user: { id: userId },
          },
        },
      },
    });

    const test = Promise.all(
      list.map(async (room) => {
        const lastMessage = await this.prisma.message.findFirst({
          where: {
            roomId: room.id,
          },
          orderBy: {
            date: 'desc',
          },
        });

        return {
          avatar: room.avatar,
          name: room.name,
          lastMessage: lastMessage == null ? '' : lastMessage,
        };
      }),
    );
    return test;
  }

  findAll() {
    return this.prisma.room.findMany({});
  }

  findOne(id: string) {
    return this.prisma.room.findUnique({
      where: { id },
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
}
