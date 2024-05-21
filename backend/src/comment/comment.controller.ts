import { Controller, Get, Post, Body, Req, Param, UseGuards} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserService } from '../user/user.service';
import { RequestWithUser } from '../@types/express-request.interface';
import { PublishService } from '../publish/publish.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Comment } from './entities/comment.entity';



@Controller('comments')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly publishService: PublishService
  ) {}

  @ApiBearerAuth('KEY_AUTH')
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    const user = await this.userService.findOne(userId);

    const publish = await this.publishService.findOne(createCommentDto.publishId);

    return this.commentService.create(createCommentDto, user, publish);
  }

  @ApiBearerAuth('KEY_AUTH')
  @Get()
  @ApiResponse({ status: 200, description: 'Return all comments', type: [Comment]})
  findAll() {
    return this.commentService.findAll();
  }

  @ApiBearerAuth('KEY_AUTH')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }
}
