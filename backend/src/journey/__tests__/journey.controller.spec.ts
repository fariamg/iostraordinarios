import { Test, TestingModule } from '@nestjs/testing';
import { JourneyController } from '../journey.controller';
import { JourneyService } from '../journey.service';
import { CreateJourneyDto } from '../dto/create-journey.dto';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../user/user.service';
import { Request } from 'express';

describe('JourneyController', () => {
  let controller: JourneyController;
  let service: JourneyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JourneyController],
      providers: [
        {
          provide: JourneyService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        RolesGuard,
        Reflector,
      ],
    }).compile();

    controller = module.get<JourneyController>(JourneyController);
    service = module.get<JourneyService>(JourneyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a journey entity', async () => {
    const createJourneyDto: CreateJourneyDto = {
      title: 'Test Journey',
      description: 'Test Content',
      tagsId: [],
      superpowersId: [],
      nuts: 100,
    };
    const req = {
      user: {
        id: 1,
      },
    } as unknown as Request;
    const result = { id: 1, ...createJourneyDto };

    jest.spyOn(service, 'create').mockResolvedValue(result as any);

    expect(await controller.create(createJourneyDto, req)).toEqual(result); 
  });

  it('should return an array of journey entities', async () => {
    const result = [{}, {}];

    jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

    expect(await controller.findAll()).toEqual(result);
  });

  it('should return a single journey entity', async () => {
    const result = {};

    jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

    expect(await controller.findOne('1')).toEqual(result);
  });
});
