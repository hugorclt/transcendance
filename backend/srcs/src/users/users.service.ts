import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  CreateUserDto,
  CreateGoogleUserDto,
  Create42UserDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status, Type, VisibilityMode } from '@prisma/client';
import { exclude } from 'src/utils/exclude';
import { UserEntity } from './entities/user.entity';
import bcrypt from 'bcrypt';
import {
  ReturnUserEntity,
  ReturnUserEntityWithPreferences,
} from './entities/return-user.entity';
import { UserPreferencesEntity } from './entities/user-preferences.entity';
import { getStatusFromVisibility } from './utils/friend-status';
import { addFriendDto } from './dto/add-friend.dto';
import { SocialsGateway } from 'src/socials/socials.gateway';
import { RoomsService } from 'src/socials/rooms/rooms.service';
import { ParticipantService } from 'src/socials/rooms/participant/participant.service';
import { defaultAvatar } from 'src/utils/base64';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly socialsGateway: SocialsGateway,
    private readonly roomService: RoomsService,
    private readonly participantService: ParticipantService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ReturnUserEntity> {
    const user: UserEntity = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
        avatar: defaultAvatar.avatar,
        preferences: {
          create: { visibility: 'VISIBLE' },
        },
        stat: {
          create: {},
        },
      },
    });
    return exclude(user, ['password', 'type', 'refreshToken']);
  }

  async createGoogle(
    createGoogleUserDto: CreateGoogleUserDto,
  ): Promise<ReturnUserEntity> {
    const user: UserEntity = await this.prisma.user.create({
      data: {
        username: createGoogleUserDto.username,
        email: createGoogleUserDto.email,
        password: createGoogleUserDto.password,
        type: createGoogleUserDto.type,
        preferences: {
          create: { visibility: 'VISIBLE' },
        },
      },
    });
    return exclude(user, ['password', 'type', 'refreshToken']);
  }

  async create42(create42UserDto: Create42UserDto): Promise<ReturnUserEntity> {
    const user: UserEntity = await this.prisma.user.create({
      data: {
        username: create42UserDto.username,
        email: create42UserDto.email,
        password: create42UserDto.password,
        type: create42UserDto.type,
        preferences: {
          create: { visibility: 'VISIBLE' },
        },
      },
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
    const userUpdate = await this.prisma.user.update({
      where: { id },
      data: { status: status as Status },
      include: {
        friends: true,
        preferences: true,
      },
    });
    if (!userUpdate) throw new NotFoundException();
    this.socialsGateway.emitToUser(
      userUpdate.id,
      'on-self-status-update',
      userUpdate.status,
    );
    if (
      userUpdate.preferences.visibility == 'VISIBLE' ||
      (userUpdate.preferences.visibility == 'AWAY' &&
        userUpdate.status == 'DISCONNECTED')
    ) {
      this.socialsGateway.emitToList(userUpdate.friends, 'on-friend-update', {
        username: userUpdate.username,
        avatar: userUpdate.avatar,
        status: userUpdate.status,
        id: userUpdate.id,
      });
    } else if (
      userUpdate.preferences.visibility == 'AWAY' &&
      userUpdate.status == 'CONNECTED'
    ) {
      this.socialsGateway.emitToList(userUpdate.friends, 'on-friend-update', {
        username: userUpdate.username,
        avatar: userUpdate.avatar,
        status: 'AWAY',
        id: userUpdate.id,
      });
    }
    return exclude(userUpdate, ['password', 'type', 'refreshToken']);
  }

  async updateVisibility(
    id: string,
    visibility: string,
  ): Promise<ReturnUserEntityWithPreferences> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        preferences: {
          update: {
            visibility: visibility as VisibilityMode,
          },
        },
      },
      include: {
        preferences: true,
        friends: true,
      },
    });
    if (!user) throw new NotFoundException();
    this.socialsGateway.emitToUser(
      user.id,
      'on-visibility-update',
      user.preferences.visibility,
    );
    let sentStatus = getStatusFromVisibility(
      user.status,
      user.preferences.visibility,
    );
    this.socialsGateway.emitToList(user.friends, 'on-friend-update', {
      username: user.username,
      avatar: user.avatar,
      status: sentStatus,
      id: user.id,
    });
    return exclude(user, ['password', 'type', 'refreshToken']);
  }

  async getUserPreferences(id: string): Promise<UserPreferencesEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { preferences: true },
    });
    return user.preferences;
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

  async addFriend(addFriendDto: addFriendDto): Promise<any> {
    //should check if invitation exist and
    //TODO
    //=> if not exist: error
    //=> if exists delete and continue
    const existingFriends = await this.prisma.user.findUnique({
      where: { id: addFriendDto.userFromId },
      include: { friends: { where: { id: addFriendDto.userId } } },
    });

    if (existingFriends?.friends.length > 0) {
      throw new ConflictException('Already friends');
    }

    const newFriend = await this.prisma.user.update({
      where: { id: addFriendDto.userFromId },
      data: { friends: { connect: { id: addFriendDto.userId } } },
      include: {
        preferences: true,
      },
    });

    const user = await this.prisma.user.update({
      where: { id: addFriendDto.userId },
      data: { friends: { connect: { id: addFriendDto.userFromId } } },
      include: {
        preferences: true,
      },
    });

    //should emit to new friend about friendship
    let status = getStatusFromVisibility(
      user.status,
      user.preferences.visibility,
    );
    this.socialsGateway.emitToUser(newFriend.id, 'on-friend-update', {
      username: user.username,
      avatar: user.avatar,
      status: status,
      id: user.id,
    });
    status = getStatusFromVisibility(
      newFriend.status,
      newFriend.preferences.visibility,
    );
    return {
      username: newFriend.username,
      avatar: newFriend.avatar,
      status: status,
      id: newFriend.id,
    };
  }

  async updateAvatar(userId: string, buffer: Buffer) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        avatar: buffer.toString('base64'),
      },
    });
    this.socialsGateway.emitToList(
      await this.getUserFriends(user.id),
      'on-friend-update',
      {
        avatar: user.avatar,
        id: user.id,
      },
    );
    return exclude(user, ['password', 'type', 'refreshToken']);
  }

  async updateUsername(userId: string, newUsername: string) {
    if (newUsername.length <= 3) throw new BadRequestException();

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: newUsername,
      },
    });

    this.socialsGateway.emitToList(
      await this.getUserFriends(user.id),
      'on-friend-update',
      {
        username: user.username,
        id: user.id,
      },
    );

    const rooms = await this.roomService.findRoomsForUser(user.id);
    Promise.all(
      rooms.map(async (room) => {
        const participant =
          await this.participantService.createParticipantFromRoom(room);
        this.socialsGateway.emitToUser(room.id, 'on-chat-update', {
          id: room.id,
          participants: participant,
        });
      }),
    );
  }

  async updatePassword(userId: string, newPassword: string) {
    if (newPassword.length == 0) throw new BadRequestException();
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(newPassword, salt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hash,
      },
    });
  }

  async removeFriends(
    userId: string,
    usernameToRemove: string,
  ): Promise<ReturnUserEntity> {
    const remover = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { friends: true },
    });

    const removed = await this.prisma.user.findUnique({
      where: { username: usernameToRemove },
      include: { friends: true },
    });

    this.removeOneRelation(remover, removed);
    this.removeOneRelation(removed, remover);
    return exclude(removed, ['password', 'type', 'refreshToken']);
  }

  async removeOneRelation(remover: any, removed: any) {
    if (!remover) throw new NotFoundException('Remover not found');
    if (!removed) throw new NotFoundException('Removed not found');

    const friend = remover.friends.find((friend) => friend.id === removed.id);
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
      include: {
        friends: {
          include: {
            preferences: true,
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.friends.map((friend) => {
      let friendStatus = getStatusFromVisibility(
        friend.status,
        friend.preferences.visibility,
      );
      return {
        id: friend.id,
        username: friend.username,
        status: friendStatus,
        avatar: friend.avatar,
      };
    });
  }

  async getUsers(userId: string[]) {
    const users = await this.prisma.user.findMany({
      where: { username: { in: userId } },
    });
    return users.map((x) => exclude(x, ['password', 'type', 'refreshToken']));
  }
}
