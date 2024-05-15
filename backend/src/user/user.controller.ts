import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':fullName')
    async findOne(@Param('fullName') fullName: string): Promise<User> {
        return this.userService.findOneByfullName(fullName);
    }

    @Post()
    async create(@Body() user: { full_name: string; password: string, email: string, position: string}): Promise<User> {
        return this.userService.createUser(user.full_name, user.password, user.email, user.position);
    }
}
