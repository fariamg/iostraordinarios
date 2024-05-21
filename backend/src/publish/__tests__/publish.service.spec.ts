import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PublishService } from '../publish.service';
import { Publish } from '../entities/publish.entity';
import { Repository } from 'typeorm';
import { CreatePublishDto } from '../dto/create-publish.dto';
import { User } from '../../user/entities/user.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { Superpower } from '../../superpower/entities/superpower.entity';

describe('PublishService', () => {
  let service: PublishService;
  let publishRepository: Repository<Publish>;
  let userRepository: Repository<User>;
  let tagRepository: Repository<Tag>;
  let superpowerRepository: Repository<Superpower>;

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
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    tagRepository = module.get<Repository<Tag>>(getRepositoryToken(Tag));
    superpowerRepository = module.get<Repository<Superpower>>(getRepositoryToken(Superpower));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new publish entity', async () => {
    const createPublishDto: CreatePublishDto = {
      title: 'Test Publish',
      description: 'Test Content',
      tagsId: [1], // Adicionando IDs de tags e superpoderes
      superpowersId: [1]
    };
    const userId = 1;
    const publish = new Publish();
    Object.assign(publish, createPublishDto, { userId });

    // Mock findOne do userRepository
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(new User());

    // Mock findByIds do tagRepository e superpowerRepository
    jest.spyOn(tagRepository, 'findByIds').mockResolvedValue([new Tag()]);
    jest.spyOn(superpowerRepository, 'findByIds').mockResolvedValue([new Superpower()]);

    // Mock save do publishRepository
    jest.spyOn(publishRepository, 'save').mockResolvedValue(publish);

    // Adicionando mock para evitar erro de find
    jest.spyOn(publishRepository, 'find').mockResolvedValue([]);

    const result = await service.create(createPublishDto, userId);
    expect(result).toEqual(publish);
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