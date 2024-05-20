import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from '../tag.controller';
import { TagService } from '../tag.service';

describe('TagController', () => {
  let controller: TagController;
  let service: TagService;

  const mockTags = [
    { id: 1, name: 'Tag1' },
    { id: 2, name: 'Tag2' },
  ];

  const mockTagService = {
    findAll: jest.fn().mockResolvedValue(mockTags),
    findOne: jest.fn().mockImplementation((id: number) => 
      Promise.resolve(mockTags.find(tag => tag.id === id))),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        {
          provide: TagService,
          useValue: mockTagService,
        },
      ],
    }).compile();

    controller = module.get<TagController>(TagController);
    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of tags', async () => {
    const tags = await controller.findAll();
    expect(tags).toEqual(mockTags);
  });

  it('should return a single tag by id', async () => {
    const tag = await controller.findOne('1');
    expect(tag).toEqual(mockTags[0]);
  });
});
