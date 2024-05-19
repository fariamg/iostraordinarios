import { Controller, Get, Body, Req, Param, Delete, UseGuards, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UserService } from 'src/user/user.service';
import { PublishService } from 'src/publish/publish.service';
import { RequestWithUser } from 'src/@types/express-request.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/@common/decorators/roles.decorator';
import { UserRole } from 'src/@common/enums/user-role.enum';

@Controller('likes')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private readonly userService: UserService,
    private readonly publishService: PublishService
  ) {}

  @Post()
  @Roles(UserRole.USER, UserRole.LEADER)
  async create(@Body() createLikeDto: CreateLikeDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    const user = await this.userService.findOne(userId);

    const publish = await this.publishService.findOne(createLikeDto.publishId);

    return this.likeService.create(createLikeDto, user, publish);
  }

  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likeService.findOne(+id);
  }

  @Delete(':id')
  removeLike(@Param('id') id: string) {
    return this.likeService.removeLike(+id);
  }
}
