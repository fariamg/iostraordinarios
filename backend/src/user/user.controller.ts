import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserRole } from './enum/user-role.enum';
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':fullName')
    async findOne(@Param('fullName') fullName: string): Promise<User> {
        return this.userService.findOneByfullName(fullName);
    }

    @Post()
    async create(@Body() user: { full_name: string; password: string, email: string, position: string, role: UserRole}): Promise<User> {
        return this.userService.createUser(user.full_name, user.password, user.email, user.position, user.role);
    }

    @Put(':id/tags')
    async updateTagsToUser(@Param('id') id: number, @Body() body: { tags: string[] }): Promise<User> {
        return this.userService.updateTagsToUser(id, body.tags);
    }
  
    @Put(':id/superpower')
    async updateSuperpower(@Param('id') id: number, @Body() body: { superpower: string }): Promise<User> {
        return this.userService.updateSuperpower(id, body.superpower);
    }
}
