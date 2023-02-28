import { Test, TestingModule } from '@nestjs/testing';
import { LobbyController } from './lobby.controller';
import { LobbyService } from './lobby.service';

describe('LobbyController', () => {
  let controller: LobbyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LobbyController],
      providers: [LobbyService],
    }).compile();

    controller = module.get<LobbyController>(LobbyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
