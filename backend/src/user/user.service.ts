import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from '../@utils/hashing.util';
import { UserRole } from './enum/user-role.enum';
import { Tag } from 'src/tag/entities/tag.entity';
import { Superpower } from 'src/superpower/entities/superpower.entity';

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

    async createUser(fullName: string, password: string, email: string, position: string, role: UserRole): Promise<User> {
        const hashedPassword = await hashPassword(password);
        const user = this.userRepository.create({ fullName, password: hashedPassword, email, position, role });
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
