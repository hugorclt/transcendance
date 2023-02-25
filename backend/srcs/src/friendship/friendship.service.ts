import { Injectable, NotFoundException } from '@nestjs/common';
import { FriendShip } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { Friendship } from './entities/friendship.entity';

@Injectable()
export class FriendshipService {
  constructor(private prisma: PrismaService) {}

  async create(createFriendshipDto: CreateFriendshipDto, userId: string) : Promise<FriendShip> {
    const userTwo: UserEntity = await this.prisma.user.findUnique({
      where: {
        username: createFriendshipDto.username
      }
    })
    if (!userTwo)
      throw new NotFoundException();
      
    const friendship: FriendShip = await this.prisma.friendShip.create({
      data: {
        userOneId: userId,
        userTwoId: userTwo.id,
      }
    })
    return friendship;
  }

  findAll() {
    return `This action returns all friendship`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friendship`;
  }

  update(id: number, updateFriendshipDto: UpdateFriendshipDto) {
    return `This action updates a #${id} friendship`;
  }

  remove(id: number) {
    return `This action removes a #${id} friendship`;
  }
}
