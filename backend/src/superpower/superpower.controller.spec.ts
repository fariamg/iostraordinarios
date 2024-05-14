import { Test, TestingModule } from '@nestjs/testing';
import { SuperpowerController } from './superpower.controller';
import { SuperpowerService } from './superpower.service';

describe('SuperpowerController', () => {
  let controller: SuperpowerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperpowerController],
      providers: [SuperpowerService],
    }).compile();

    controller = module.get<SuperpowerController>(SuperpowerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
