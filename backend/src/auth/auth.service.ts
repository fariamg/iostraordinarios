import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { AuthPayloadDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    login(user: any) {
        const payload = { username: user.username, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser({ username, password }: AuthPayloadDto) {
        const user = await this.userRepository.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException();
        }

        const { password: _, ...result } = user;
        return result;
    }
}
