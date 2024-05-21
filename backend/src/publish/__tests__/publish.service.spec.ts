import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PublishService } from '../publish.service';
import { Publish } from '../entities/publish.entity';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { Superpower } from '../../superpower/entities/superpower.entity';

describe('PublishService', () => {
  let service: PublishService;
  let publishRepository: Repository<Publish>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublishService,
        {
          provide: getRepositoryToken(Publish),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Tag),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Superpower),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PublishService>(PublishService);
    publishRepository = module.get<Repository<Publish>>(getRepositoryToken(Publish));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of publish entities', async () => {
    const publishArray = [
      new Publish(),
      new Publish(),
    ];

    jest.spyOn(publishRepository, 'find').mockResolvedValue(publishArray);

    const result = await service.findAll();
    expect(result).toEqual(publishArray);
  });

  it('should return a single publish entity', async () => {
    const publish = new Publish();

    jest.spyOn(publishRepository, 'findOne').mockResolvedValue(publish);

    const result = await service.findOne(1);
    expect(result).toEqual(publish);
  });
});