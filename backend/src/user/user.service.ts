import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { hashPassword } from '../@utils/hashing.util';
import { Tag } from '../tag/entities/tag.entity';
import { Superpower } from '../superpower/entities/superpower.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { In, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
        @InjectRepository(Superpower)
        private readonly superpowerRepository: Repository<Superpower>,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { fullName, password, email, position, role, superpowerId, tagsId } = createUserDto;
        const hashedPassword = await hashPassword(password);

        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
          throw new ConflictException('E-mail já está em uso');
        }

        const superpower = await this.superpowerRepository.findOne({ where: { id: superpowerId } });
        if (!superpower) {
            throw new NotFoundException('Superpoder não encontrado');
        }   

        let tags = [];
        if (tagsId && tagsId.length > 0) {
            tags = await this.tagRepository.find({ where: { id: In(tagsId) } });
            if (tags.length !== tagsId.length) {
                throw new NotFoundException('Uma ou mais tags não encontradas');
            }
        }

        const user = this.userRepository.create({
            fullName,
            password: hashedPassword,
            email,
            position,
            role,
            superpower,
            tags,
        });

        const savedUser = await this.userRepository.save(user);
        return plainToInstance(User, savedUser);
    }

    async findOne(id: number): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ where: { id }, relations: ['tags', 'superpower', 'likes.publish'] });
        if (user) {
            delete user.password;
        }
        return user;   
    }

    async findOneByfullName(fullName: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { fullName } });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find({
            order: {
                score: 'DESC',
            },
        });
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id }, relations: ['tags', 'superpower'] });
        if (!user) {
          throw new NotFoundException('Usuário não encontrado');
        }
    
        if (updateUserDto.email && updateUserDto.email !== user.email) {
          const existingUser = await this.userRepository.findOne({ where: { email: updateUserDto.email } });
          if (existingUser) {
            throw new ConflictException('E-mail já está em uso');
          }
        }
    
        if (updateUserDto.password) {
          updateUserDto.password = await hashPassword(updateUserDto.password);
        }
    
        if (updateUserDto.superpowerId) {
          const superpower = await this.superpowerRepository.findOne({ where: { id: updateUserDto.superpowerId } });
          if (!superpower) {
            throw new NotFoundException('Superpoder não encontrado');
          }
          user.superpower = superpower;
          delete updateUserDto.superpowerId; // Remover superpowerId do DTO
        }
    
        if (updateUserDto.tagsId && updateUserDto.tagsId.length > 0) {
          const tags = await this.tagRepository.find({ where: { id: In(updateUserDto.tagsId) } });
          if (tags.length !== updateUserDto.tagsId.length) {
            throw new NotFoundException('Uma ou mais tags não encontradas');
          }
          user.tags = tags;
          delete updateUserDto.tagsId; // Remover tagsId do DTO
        }
    
        Object.assign(user, updateUserDto);
        const savedUser = await this.userRepository.save(user);
        return plainToInstance(User, savedUser);
    }

    async updateTagsToUser(userId: number, tagNames: string[]): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['tags'] });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const tags = await this.tagRepository.find({ where: tagNames.map(name => ({ name })) });
        user.tags = tags;

        return this.userRepository.save(user);
    }

    async updateSuperpower(userId: number, superpowerName: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['superpower'] });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const superpower = await this.superpowerRepository.findOne({ where: { name: superpowerName } });

        if (!superpower) {
            throw new NotFoundException('Superpoder não encontrado');
        }

        user.superpower = superpower;

        return this.userRepository.save(user);
    }

    async getRanking(): Promise<User[]> {
        const users = await this.userRepository.find({
            order: {
                score: 'DESC',
            },
        });

        return users;
    }

    async incrementScoreAndInteractions(userId: number): Promise<void> {
        const user = await this.findOne(userId);
        if (!user) {
          throw new NotFoundException('User not found');
        }
        user.score += 1;
        user.interactionsCount += 1;
        await this.userRepository.save(user);
    }
}
