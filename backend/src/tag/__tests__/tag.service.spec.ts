import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagService } from '../tag.service';
import { Tag } from '../entities/tag.entity';

describe('TagService', () => {
  let service: TagService;
  let repository: Repository<Tag>;

  const mockTags = [
    { id: 1, name: 'Tag1' },
    { id: 2, name: 'Tag2' },
  ];

  const mockTagRepository = {
    find: jest.fn().mockResolvedValue(mockTags),
    findOneBy: jest.fn().mockImplementation(({ id }) => 
      Promise.resolve(mockTags.find(tag => tag.id === id))),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: getRepositoryToken(Tag),
          useValue: mockTagRepository,
        },
      ],
    }).compile();

    service = module.get<TagService>(TagService);
    repository = module.get<Repository<Tag>>(getRepositoryToken(Tag));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of tags', async () => {
    const tags = await service.findAll();
    expect(tags).toEqual(mockTags);
  });

  it('should return a single tag by id', async () => {
    const tag = await service.findOne(1);
    expect(tag).toEqual(mockTags[0]);
  });
});
