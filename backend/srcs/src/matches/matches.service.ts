import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchEntity } from './entities/match.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class MatchesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMatchDto: CreateMatchDto): Promise<MatchEntity> {
    const match = await this.prisma.match.create({
      data: {
        date: createMatchDto.date,
        duration: createMatchDto.duration,
        winnerScore: createMatchDto.winnerScore,
        winners: {
          connect: createMatchDto.winners.map((winner) => ({ id: winner })),
        },
        loserScore: createMatchDto.loserScore,
        losers: {
          connect: createMatchDto.losers.map((losers) => ({ id: losers })),
        },
      },
      include: {
        winners: true,
        losers: true,
      },
    });
    return match;
  }

  async findAll(): Promise<MatchEntity[]> {
    const matches = await this.prisma.match.findMany({
      include: {
        winners: true,
        losers: true,
      },
    });
    return matches;
  }

  async findOne(id: string): Promise<MatchEntity> {
    const match = await this.prisma.match.findUnique({
      where: { id },
      include: { winners: true, losers: true },
    });
    if (!match) throw new NotFoundException('Match not found');
    return match;
  }

  async update(
    id: string,
    updateMatchDto: UpdateMatchDto,
  ): Promise<MatchEntity> {
    return await this.prisma.match.update({
      where: { id },
      data: {
        date: updateMatchDto.date,
        duration: updateMatchDto.duration,
        winnerScore: updateMatchDto.winnerScore,
        loserScore: updateMatchDto.loserScore,
      },
      include: {
        winners: true,
        losers: true,
      },
    });
  }

  async findMatchByUserId(id: string): Promise<MatchEntity[]> {
    const matches = await this.prisma.match.findMany({
      where: {
        OR: [{ winners: { some: { id } } }, { losers: { some: { id } } }],
      },
      orderBy: {
        date: 'desc',
      },
      include: {
        winners: true,
        losers: true,
      },
    });
    return matches;
  }

  async delete(id: string): Promise<MatchEntity> {
    const match = await this.prisma.match.delete({
      where: { id },
      include: { winners: true, losers: true },
    });
    return match;
  }
}
