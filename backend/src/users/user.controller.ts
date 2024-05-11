import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':username')
    async findOne(@Param('username') username: string): Promise<User> {
        return this.userService.findOneByUsername(username);
    }

    @Post()
    async create(@Body() user: { username: string; password: string }): Promise<User> {
        return this.userService.createUser(user.username, user.password);
    }
}
