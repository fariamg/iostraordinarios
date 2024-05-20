// superpower.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { SuperpowerController } from '../superpower.controller';
import { SuperpowerService } from '../superpower.service';
import { Superpower } from '../entities/superpower.entity';

describe('SuperpowerController', () => {
  let controller: SuperpowerController;
  let service: SuperpowerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperpowerController],
      providers: [
        {
          provide: SuperpowerService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SuperpowerController>(SuperpowerController);
    service = module.get<SuperpowerService>(SuperpowerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all superpowers', async () => {
    const superpower = new Superpower();
    superpower.name = 'As maravilhosas asas para inovar';
    jest.spyOn(service, 'findAll').mockResolvedValue([superpower]);

    const result = await controller.findAll();
    expect(result).toEqual([superpower]);
  });

  it('should find a superpower by id', async () => {
    const superpower = new Superpower();
    superpower.id = 1;
    superpower.name = 'As maravilhosas asas para inovar';
    jest.spyOn(service, 'findOne').mockResolvedValue(superpower);

    const result = await controller.findOne('1');
    expect(result).toEqual(superpower);
  });
});
