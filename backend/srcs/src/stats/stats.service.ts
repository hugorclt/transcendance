import { Injectable } from '@nestjs/common';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { StatEntity } from './entities/stat.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createStatDto: CreateStatDto): Promise<StatEntity> {
    const stat = await this.prisma.stat.create({
      data: {
        xp: createStatDto.xp,
        lvl: createStatDto.lvl,
        nbGame: createStatDto.nbGame,
        nbWin: createStatDto.nbWin,
        user: {
          connect: { id: createStatDto.user },
        },
      },
      include: {
        user: true,
      },
    });
    return stat;
  }

  async getLeaderboards() {
    const globalStat = await this.prisma.stat.findMany({});

    return Promise.all(
      await globalStat.map(async (stats) => {
        const user = await this.prisma.user.findUnique({
          where: {
            id: stats.userId,
          },
        });

        return {
          name: user.username,
          stats: [stats.nbWin, stats.nbGoal],
        };
      }),
    );
  }

  async findAll(): Promise<StatEntity[]> {
    const stats = await this.prisma.stat.findMany({
      include: { user: true },
    });
    return stats;
  }

  async findOne(id: string): Promise<StatEntity> {
    const stat = await this.prisma.stat.findUnique({
      where: { id },
      include: { user: true },
    });
    return stat;
  }

  async findOneByUserId(id: string): Promise<StatEntity> {
    const stat = await this.prisma.stat.findUnique({
      where: { userId: id },
      include: { user: true },
    });
    return stat;
  }

  async update(id: string, updateStatDto: UpdateStatDto): Promise<StatEntity> {
    return await this.prisma.stat.update({
      where: { id },
      data: {
        xp: updateStatDto.xp,
        lvl: updateStatDto.lvl,
        nbGame: updateStatDto.nbGame,
        nbWin: updateStatDto.nbWin,
      },
      include: { user: true },
    });
  }

  async delete(id: string): Promise<StatEntity> {
    const stat = await this.prisma.stat.delete({
      where: { id },
      include: { user: true },
    });
    return stat;
  }
}
