import { Test, TestingModule } from '@nestjs/testing';
import { LobbiesService } from './lobbies.service';

describe('LobbiesService', () => {
  let service: LobbiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LobbiesService],
    }).compile();

    service = module.get<LobbiesService>(LobbiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
