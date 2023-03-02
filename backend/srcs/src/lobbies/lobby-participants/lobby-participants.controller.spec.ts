import { Test, TestingModule } from '@nestjs/testing';
import { LobbyParticipantsController } from './lobby-participants.controller';
import { LobbyParticipantsService } from './lobby-participants.service';

describe('LobbyParticipantsController', () => {
  let controller: LobbyParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LobbyParticipantsController],
      providers: [LobbyParticipantsService],
    }).compile();

    controller = module.get<LobbyParticipantsController>(LobbyParticipantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
