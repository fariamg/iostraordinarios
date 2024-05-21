import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
// import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { UserRole } from '../../@common/enums/user-role.enum';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            updateUser: jest.fn(),
            updateTagsToUser: jest.fn(),
            updateSuperpower: jest.fn(),
            getRanking: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        fullName: 'Davi Ferreira',
        password: 'password123',
        email: 'daviferreiradev@gmail.com',
        position: 'Back-end Developer',
        role: UserRole.USER,
        superpowerId: 1,
        tagsId: [1, 2],
      };

      const user = new User();
      jest.spyOn(service, 'createUser').mockResolvedValue(user);

      const result = await controller.create(createUserDto);

      expect(result).toBe(user);
      expect(service.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = new User();
      jest.spyOn(service, 'findOne').mockResolvedValue(user);

      const result = await controller.findOneById(1);

      expect(result).toBe(user);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException('Usuário não encontrado'));

      await expect(controller.findOneById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        fullName: 'John Updated',
      };

      const user = new User();
      jest.spyOn(service, 'updateUser').mockResolvedValue(user);

      const result = await controller.update(1, updateUserDto);

      expect(result).toBe(user);
      expect(service.updateUser).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

});
