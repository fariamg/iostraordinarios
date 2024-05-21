import { Test, TestingModule } from '@nestjs/testing';
import { PublishController } from '../publish.controller';
import { PublishService } from '../publish.service';
import { CreatePublishDto } from '../dto/create-publish.dto';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

describe('PublishController', () => {
  let controller: PublishController;
  let service: PublishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublishController],
      providers: [
        {
          provide: PublishService,
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
        RolesGuard,
        Reflector,
      ],
    }).compile();

    controller = module.get<PublishController>(PublishController);
    service = module.get<PublishService>(PublishService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a publish entity', async () => {
    const createPublishDto: CreatePublishDto = {
      title: 'Test Publish',
      description: 'Test Content',
      tagsId: [],
      superpowersId: []
    };
    const req = {
      user: {
        id: 1,
      },
    } as unknown as Request;
    const result = { id: 1, ...createPublishDto };

    jest.spyOn(service, 'create').mockResolvedValue(result as any);

    expect(await controller.create(createPublishDto, req)).toEqual(result); // Passe o mock do req
  });

  it('should return an array of publish entities', async () => {
    const result = [{}, {}];

    jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

    expect(await controller.findAll()).toEqual(result);
  });

  it('should return a single publish entity', async () => {
    const result = {};

    jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

    expect(await controller.findOne('1')).toEqual(result);
  });
});
