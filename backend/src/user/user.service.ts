import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from '../utils/hashing.util';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createUser(fullName: string, password: string, email: string, position: string): Promise<User> {
        const hashedPassword = await hashPassword(password);
        const user = this.userRepository.create({ fullName, password: hashedPassword, email, position });
        return this.userRepository.save(user);
    }

    async findOne(id: number): Promise<User | undefined> {
        return this.userRepository.findOneBy({ id });
    }

    async findOneByfullName(fullName: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { fullName } });
    }
}
