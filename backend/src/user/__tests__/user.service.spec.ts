import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { Superpower } from '../../superpower/entities/superpower.entity';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UserRole } from '../../@common/enums/user-role.enum';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let tagRepository: Repository<Tag>;
  let superpowerRepository: Repository<Superpower>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
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

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    tagRepository = module.get<Repository<Tag>>(getRepositoryToken(Tag));
    superpowerRepository = module.get<Repository<Superpower>>(getRepositoryToken(Superpower));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const createUserDto: CreateUserDto = {
        fullName: 'John Doe',
        password: 'password123',
        email: 'john.doe@example.com',
        position: 'Developer',
        role: UserRole.USER,
        superpowerId: 1,
        tagsId: [1, 2],
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(superpowerRepository, 'findOne').mockResolvedValueOnce(new Superpower());
      jest.spyOn(tagRepository, 'find').mockResolvedValueOnce([new Tag(), new Tag()]);
      jest.spyOn(userRepository, 'create').mockReturnValue(new User());
      jest.spyOn(userRepository, 'save').mockResolvedValue(new User());

      const result = await service.createUser(createUserDto);

      expect(result).toBeInstanceOf(User);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: createUserDto.email } });
      expect(superpowerRepository.findOne).toHaveBeenCalledWith({ where: { id: createUserDto.superpowerId } });
      expect(tagRepository.find).toHaveBeenCalledWith({ where: { id: In(createUserDto.tagsId) } });
      expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining({ email: createUserDto.email }));
      expect(userRepository.save).toHaveBeenCalledWith(expect.any(User));
    });

    it('should throw ConflictException if email is already in use', async () => {
      const createUserDto: CreateUserDto = {
        fullName: 'John Doe',
        password: 'password123',
        email: 'john.doe@example.com',
        position: 'Developer',
        role: UserRole.USER,
        superpowerId: 1,
        tagsId: [1, 2],
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(new User());

      await expect(service.createUser(createUserDto)).rejects.toThrow(ConflictException);
    });

    it('should throw NotFoundException if superpower not found', async () => {
      const createUserDto: CreateUserDto = {
        fullName: 'John Doe',
        password: 'password123',
        email: 'john.doe@example.com',
        position: 'Developer',
        role: UserRole.USER,
        superpowerId: 1,
        tagsId: [1, 2],
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(superpowerRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.createUser(createUserDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if one or more tags not found', async () => {
      const createUserDto: CreateUserDto = {
        fullName: 'John Doe',
        password: 'password123',
        email: 'john.doe@example.com',
        position: 'Developer',
        role: UserRole.USER,
        superpowerId: 1,
        tagsId: [1, 2],
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(superpowerRepository, 'findOne').mockResolvedValueOnce(new Superpower());
      jest.spyOn(tagRepository, 'find').mockResolvedValueOnce([new Tag()]);

      await expect(service.createUser(createUserDto)).rejects.toThrow(NotFoundException);
    });
  });

});
