import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from './enum/user-role.enum';
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

    async createAdminUser() {
        const adminUserExists = await this.findOneByUsername('admin');
        if (!adminUserExists) {
          const hashedPassword = await hashPassword('123');
          const adminUser = this.userRepository.create({
            username: 'admin',
            password: hashedPassword,
            email: 'admin@example.com',
            role: UserRole.ADMIN, 
          });
          await this.userRepository.save(adminUser);
        }
    }
}
