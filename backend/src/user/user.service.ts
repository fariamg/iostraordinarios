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

    async createUser(username: string, password: string, email: string): Promise<User> {
        const hashedPassword = await hashPassword(password);
        const user = this.userRepository.create({ username, password: hashedPassword, email });
        return this.userRepository.save(user);
    }

    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }
}
