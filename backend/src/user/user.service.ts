import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { hashPassword } from '../@utils/hashing.util';
import { Tag } from 'src/tag/entities/tag.entity';
import { Superpower } from 'src/superpower/entities/superpower.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';

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
        const { fullName, password, email, position, role } = createUserDto;
        const hashedPassword = await hashPassword(password);
    
        const user = this.userRepository.create({
          fullName,
          password: hashedPassword,
          email,
          position,
          role,
        });
    
        return this.userRepository.save(user);
    }

    async findOne(id: number): Promise<User | undefined> {
        return this.userRepository.findOneBy({ id });
    }

    async findOneByfullName(fullName: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { fullName } });
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
}
