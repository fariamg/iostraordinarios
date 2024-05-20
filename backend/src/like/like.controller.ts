import { Controller, Get, Body, Req, Param, Delete, UseGuards, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UserService } from 'src/user/user.service';
import { PublishService } from 'src/publish/publish.service';
import { RequestWithUser } from 'src/@types/express-request.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('likes')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private readonly userService: UserService,
    private readonly publishService: PublishService
  ) {}

  @ApiBearerAuth('KEY_AUTH')
  @Post()
  async create(@Body() createLikeDto: CreateLikeDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    const user = await this.userService.findOne(userId);
    const publish = await this.publishService.findOne(createLikeDto.publishId);
    return this.likeService.create(createLikeDto, user, publish);
  }

  @ApiBearerAuth('KEY_AUTH')
  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @ApiBearerAuth('KEY_AUTH')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likeService.findOne(+id);
  }

  @ApiBearerAuth('KEY_AUTH')
  @Delete('/:publishId')  
  removeLike(@Req() req, @Param('publishId') publishId: string) {
    const creatorId = req.user.id;
    return this.likeService.removeLike(+publishId, +creatorId);
  }
}

