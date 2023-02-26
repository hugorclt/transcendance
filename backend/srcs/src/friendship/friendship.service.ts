import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FriendShip, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnUserEntity } from 'src/users/entities/return-user.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { exclude } from 'src/utils/exclude';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';

@Injectable()
export class FriendshipService {
  constructor(private prisma: PrismaService) {}

  async create(
    createFriendshipDto: CreateFriendshipDto,
    userId: string,
  ): Promise<FriendShip> {
    const userTwo: UserEntity = await this.prisma.user.findUnique({
      where: {
        username: createFriendshipDto.username,
      },
    });
    if (!userTwo) throw new NotFoundException();
    if (await this.checkIfFriendShipExist(userId, userTwo.id) == false) {
      throw new ConflictException();
    }

    const friendship: FriendShip = await this.prisma.friendShip.create({
      data: {
        userOneId: userId,
        userTwoId: userTwo.id,
      },
    });
    await this.prisma.friendShip.create({
      data: {
        userOneId: userTwo.id,
        userTwoId: userId,
      },
    });
    return friendship;
  }

  findAll() {
    return `This action returns all friendship`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friendship`;
  }

  async findManyForOneUser(userId: string): Promise<ReturnUserEntity[]> {
    const friendShipList: FriendShip[] = await this.prisma.friendShip.findMany({
      where: {
        userOneId: userId,
      },
    });

    var userList: UserEntity[] = await this.createUserFriendList(
      friendShipList,
      userId,
    );
    return userList.map((x) =>
      exclude(x, ['password', 'type', 'refreshToken']),
    );
  }

  update(id: number, updateFriendshipDto: UpdateFriendshipDto) {
    return `This action updates a #${id} friendship`;
  }

  remove(id: number) {
    return `This action removes a #${id} friendship`;
  }

  /* -------------------------------------------------------------------------- */
  /*                                    utils                                   */
  /* -------------------------------------------------------------------------- */
  async checkIfFriendShipExist(
    userOneId: string,
    userTwoId: string,
  ): Promise<boolean> {
    const alreadyExist: FriendShip = await this.prisma.friendShip.findFirst({
      where: {
        userOneId: userOneId,
        userTwoId: userTwoId,
      },
    });

    return alreadyExist == null ? true : false;
  }

  async createUserFriendList(
    friendShipList: FriendShip[],
    userId: string,
  ): Promise<UserEntity[]> {

    var userList = Promise.all(
      friendShipList.map(async (val) => {
        if (userId != val.userTwoId) {
          return await this.prisma.user.findUnique({
            where: {
              id: val.userTwoId,
            },
          });
        }
      }),
    );
    return userList;
  }
}
