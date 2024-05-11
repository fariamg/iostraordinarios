import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }

    async createUser(username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10); // Criptografa a senha
        const user = this.userRepository.create({ username, password: hashedPassword });
        return this.userRepository.save(user);
    }
}
