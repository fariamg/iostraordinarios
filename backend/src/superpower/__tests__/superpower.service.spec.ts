// superpower.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { SuperpowerService } from '../superpower.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Superpower } from '../entities/superpower.entity';
import { Repository } from 'typeorm';

describe('SuperpowerService', () => {
  let service: SuperpowerService;
  let repository: Repository<Superpower>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperpowerService,
        {
          provide: getRepositoryToken(Superpower),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SuperpowerService>(SuperpowerService);
    repository = module.get<Repository<Superpower>>(getRepositoryToken(Superpower));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all superpowers', async () => {
    const superpower = new Superpower();
    superpower.name = 'As maravilhosas asas para inovar';
    jest.spyOn(repository, 'find').mockResolvedValue([superpower]);

    const result = await service.findAll();
    expect(result).toEqual([superpower]);
  });

  it('should find a superpower by id', async () => {
    const superpower = new Superpower();
    superpower.id = 1;
    superpower.name = 'As maravilhosas asas para inovar';
    jest.spyOn(repository, 'findOne').mockResolvedValue(superpower);

    const result = await service.findOne(1);
    expect(result).toEqual(superpower);
  });
});
