import { Test, TestingModule } from '@nestjs/testing';
import { FriendsActivityGateway } from './friends-activity.gateway';

describe('FriendsActivityGateway', () => {
  let gateway: FriendsActivityGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendsActivityGateway],
    }).compile();

    gateway = module.get<FriendsActivityGateway>(FriendsActivityGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
