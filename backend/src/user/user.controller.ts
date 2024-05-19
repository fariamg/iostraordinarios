import { Controller, Get, Param, Body, Patch, Post, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express'; // Importação adicionada
import { Public } from 'src/@common/decorators/public.decorator';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // Adicionando rota /me
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Req() req: Request): Promise<User> {
        const userId = req.user['id']; 
        return this.userService.findOne(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOneById(@Param('id') id: number): Promise<User> {
        return this.userService.findOne(id);
    }

    @Get('fullName/:fullName')
    async findOne(@Param('fullName') fullName: string): Promise<User> {
        return this.userService.findOneByfullName(fullName);
    }

    @Public()
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Patch(':id/tags')
    async updateTagsToUser(@Param('id') id: number, @Body() body: { tags: string[] }): Promise<User> {
        return this.userService.updateTagsToUser(id, body.tags);
    }

    @Patch(':id/superpower')
    async updateSuperpower(@Param('id') id: number, @Body() body: { superpower: string }): Promise<User> {
        return this.userService.updateSuperpower(id, body.superpower);
    }

}
