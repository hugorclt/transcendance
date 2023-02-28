import { Test, TestingModule } from '@nestjs/testing';
import { LobbiesController } from './lobbies.controller';
import { LobbiesService } from './lobbies.service';

describe('LobbiesController', () => {
  let controller: LobbiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LobbiesController],
      providers: [LobbiesService],
    }).compile();

    controller = module.get<LobbiesController>(LobbiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
