import { Test, TestingModule } from '@nestjs/testing';
import { JourneyService } from '../journey.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Journey } from '../entities/journey.entity';
import { User } from '../../user/entities/user.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { Superpower } from '../../superpower/entities/superpower.entity';
import { JourneyUser } from '../entities/journey-user.entity';
import { UserService } from '../../user/user.service';
import { Repository } from 'typeorm';

describe('JourneyService', () => {
  let service: JourneyService;
  let journeyRepository: Repository<Journey>;
  let userRepository: Repository<User>;
  let tagRepository: Repository<Tag>;
  let superpowerRepository: Repository<Superpower>;
  let journeyUserRepository: Repository<JourneyUser>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JourneyService,
        {
          provide: getRepositoryToken(Journey),
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
        {
          provide: getRepositoryToken(JourneyUser),
          useClass: Repository,
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<JourneyService>(JourneyService);
    journeyRepository = module.get<Repository<Journey>>(getRepositoryToken(Journey));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    tagRepository = module.get<Repository<Tag>>(getRepositoryToken(Tag));
    superpowerRepository = module.get<Repository<Superpower>>(getRepositoryToken(Superpower));
    journeyUserRepository = module.get<Repository<JourneyUser>>(getRepositoryToken(JourneyUser));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new journey', async () => {
    const journey = {
      title: 'Test Journey',
      description: 'Test Content',
      tagsId: [],
      superpowersId: [],
      nuts: 100,
    };
    const result = {
      id: 1,
      ...journey,
    };

    const user = { id: 1, name: 'Test User' };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user as any);
    jest.spyOn(journeyRepository, 'save').mockResolvedValue(result as any);
    jest.spyOn(tagRepository, 'find').mockResolvedValue([]);
    jest.spyOn(superpowerRepository, 'find').mockResolvedValue([]);

    expect(await service.create(journey, 1)).toEqual(result);
  });

  it('should find all journeys', async () => {
    const result = [{}, {}];

    jest.spyOn(journeyRepository, 'find').mockResolvedValue(result as any);

    expect(await service.findAll()).toEqual(result);
  });

  it('should find one journey by id', async () => {
    const result = {};

    jest.spyOn(journeyRepository, 'findOne').mockResolvedValue(result as any);

    expect(await service.findOne(1)).toEqual(result);
  });
});
