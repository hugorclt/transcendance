import { Test, TestingModule } from '@nestjs/testing';
import { LobbyParticipantsService } from './lobby-participants.service';

describe('LobbyParticipantsService', () => {
  let service: LobbyParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LobbyParticipantsService],
    }).compile();

    service = module.get<LobbyParticipantsService>(LobbyParticipantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
