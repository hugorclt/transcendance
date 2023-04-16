import { ConflictException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LobbiesGateway } from 'src/lobbies/lobbies.gateway';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService, private socket: LobbiesGateway) {}

  async findAll() {
    return await this.prisma.item.findMany({});
  }

  async findItem(userId: string, itemId: string) {
    return await this.prisma.item.findFirst({
      where: {
        id: itemId,
        owners: {
          some: {
            id: userId,
          }
        }
      }
    })
  }

  async buyItem(userId: string, itemName: string) {
    const item = await this.prisma.item.findFirst({
      where: {
        name: itemName,
      }
    })

    const alreadyHave = await this.findItem(userId, item.id);
    if (alreadyHave) throw new ConflictException();

    await this.prisma.item.update({
      where: {
        id: item.id,
      },
      data: {
        owners: {
          connect: {
            id: userId,
          }
        }
      }
    })
    return "success";
  }
}
