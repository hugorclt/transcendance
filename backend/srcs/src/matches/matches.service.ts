import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchEntity } from './entities/match.entity';
import { PrismaService } from 'src/prisma/prisma.service';

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

  findAll() {
    return `This action returns all matches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} match`;
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }
}
