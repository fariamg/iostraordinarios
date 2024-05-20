import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { AuthPayloadDto } from './dto/auth.dto';
import { comparePasswords } from '../@utils/hashing.util';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async validateUser(authPayloadDto: AuthPayloadDto) {
        const { email, password } = authPayloadDto;
        const user = await this.userRepository.createQueryBuilder("user")
        .select(["user.id", "user.password", "user.role"]) 
        .where("user.email = :email", { email })
        .getOne();

        if (!user || !(await comparePasswords(password, user.password))) {
            throw new UnauthorizedException();
        }

        const { password: _, ...result } = user;
        return result;
    }

    async login(authPayloadDto: AuthPayloadDto) {
        const user = await this.validateUser(authPayloadDto);
        const payload = { email: user.email, sub: user.id, role: user.role }; 
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
