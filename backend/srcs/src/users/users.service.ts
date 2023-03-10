import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDto,
  CreateGoogleUserDto,
  Create42UserDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status, Type } from '@prisma/client';
import { exclude } from 'src/utils/exclude';
import { UserEntity } from './entities/user.entity';
import { ReturnUserEntity } from './entities/return-user.entity';
import { SocialsGateway } from 'src/socials/socials.gateway';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<ReturnUserEntity> {
    const user: UserEntity = await this.prisma.user.create({
      data: createUserDto,
    });
    return exclude(user, ['password', 'type', 'refreshToken']);
  }

  async createGoogle(
    createGoogleUserDto: CreateGoogleUserDto,
  ): Promise<ReturnUserEntity> {
    const user: UserEntity = await this.prisma.user.create({
      data: createGoogleUserDto,
    });
    return exclude(user, ['password', 'type', 'refreshToken']);
  }

  async create42(create42UserDto: Create42UserDto): Promise<ReturnUserEntity> {
    const user: UserEntity = await this.prisma.user.create({
      data: create42UserDto,
    });
    return exclude(user, ['password', 'type', 'refreshToken']);
  }

  async findAll(): Promise<ReturnUserEntity[]> {
    const users: UserEntity[] = await this.prisma.user.findMany({});
    if (users)
      return users.map((x) => exclude(x, ['password', 'type', 'refreshToken']));
    throw new NotFoundException();
  }

  async findOne(id: string): Promise<ReturnUserEntity> {
    const user: UserEntity = await this.prisma.user.findUnique({
      where: { id },
    });
    if (user) return exclude(user, ['password', 'type', 'refreshToken']);
    throw new NotFoundException();
  }

  async findOneByUsername(username: string): Promise<ReturnUserEntity> {
    const user: UserEntity = await this.prisma.user.findUnique({
      where: { username },
    });
    if (user) return exclude(user, ['password', 'type', 'refreshToken']);
    throw new NotFoundException();
  }

  async findOneByUser(username: string): Promise<UserEntity> {
    const user: UserEntity = await this.prisma.user.findUnique({
      where: { username },
    });
    if (user) return user;
    throw new NotFoundException();
  }

  async findOneByEmail(email: string): Promise<ReturnUserEntity> {
    const user: UserEntity = await this.prisma.user.findUnique({
      where: { email },
    });
    if (user) return exclude(user, ['password', 'type', 'refreshToken']);
    throw new NotFoundException();
  }

  async findOneGoogleUser(email: string): Promise<ReturnUserEntity> {
    const user: UserEntity = await this.prisma.user.findFirst({
      where: {
        email: email,
        type: Type.GOOGLE,
      },
    });
    if (user) return exclude(user, ['password', 'type', 'refreshToken']);
    throw new NotFoundException();
  }

  async findOne42User(email: string): Promise<ReturnUserEntity> {
    const user: UserEntity = await this.prisma.user.findFirst({
      where: {
        email: email,
        type: Type.API42,
      },
    });
    if (user) return exclude(user, ['password', 'type', 'refreshToken']);
    throw new NotFoundException();
  }

  async findConnected(): Promise<ReturnUserEntity[]> {
    const users: UserEntity[] = await this.prisma.user.findMany({
      where: { status: Status.CONNECTED },
    });
    if (users)
      return users.map((x) => exclude(x, ['password', 'type', 'refreshToken']));
    throw new NotFoundException();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user: UserEntity = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    if (user) return exclude(user, ['password', 'type', 'refreshToken']);
    throw new NotFoundException();
  }

  async updateStatus(id: string, status: string): Promise<ReturnUserEntity> {
    const user: UserEntity = await this.prisma.user.update({
      where: { id },
      data: { status: status as Status },
    });
    if (user) return exclude(user, ['password', 'type', 'refreshToken']);
    throw new NotFoundException();
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const user: UserEntity = await this.prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
    if (user) return exclude(user, ['password', 'type', 'refreshToken']);
    throw new NotFoundException('User not found');
  }

  async remove(id: string) {
    const user: UserEntity = await this.prisma.user.delete({
      where: { id },
    });
    if (user) return exclude(user, ['password', 'type', 'refreshToken']);
    throw new NotFoundException('User not found');
  }

  async addFriend(userId1: string, userId2: string): Promise<void> {
    const existingFriends = await this.prisma.user.findUnique({
      where: { id: userId1 },
      include: { friends: { where: { id: userId2 } } },
    });

    if (existingFriends?.friends.length > 0) {
      throw new ConflictException('Already friends');
    }

    await this.prisma.user.update({
      where: { id: userId1 },
      data: { friends: { connect: { id: userId2 } } },
    });

    await this.prisma.user.update({
      where: { id: userId2 },
      data: { friends: { connect: { id: userId1 } } },
    });
  }

  async removeFriends(
    userId: string,
    usernameToRemove: string,
  ): Promise<ReturnUserEntity> {
    const remover = await this.prisma.user.findUnique({
      where: {id: userId},
      include: {friends: true},
    })

    const removed = await this.prisma.user.findUnique({
      where: {username: usernameToRemove},
      include: {friends: true},
    })

    this.removeOneRelation(remover, removed);
    this.removeOneRelation(removed, remover);
    return exclude(removed, ['password', 'type', 'refreshToken']);
  }

  async removeOneRelation(remover: any, removed: any) {
    if (!remover) throw new NotFoundException('Remover not found');
    if (!removed) throw new NotFoundException('Removed not found');

    const friend = remover.friends.find(
      (friend) => friend.id === removed.id,
    );
    if (!friend) throw new NotFoundException('Friend not found');

    await this.prisma.user.update({
      where: { id: remover.id },
      data: {
        friends: { disconnect: { id: friend.id } },
      },
    });
  }

  async getUserFriends(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { friends: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.friends;
  }

  async getUsers(userId: string[]) {
    const users = await this.prisma.user.findMany({
      where: { username: { in: userId } },
    });
    return users.map((x) => exclude(x, ['password', 'type', 'refreshToken']));
  }
}
