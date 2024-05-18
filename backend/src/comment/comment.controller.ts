import { Controller, Get, Post, Body, Req, Param, UseGuards} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserService } from 'src/user/user.service';
import { RequestWithUser } from 'src/@types/express-request.interface';
import { PostService } from 'src/post/post.service';
import { Roles } from 'src/@common/decorators/roles.decorator';
import { UserRole } from 'src/@common/enums/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';


@Controller('comments')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly postService: PostService
  ) {}

  @Post()
  @Roles(UserRole.USER, UserRole.LEADER)
  async create(@Body() createCommentDto: CreateCommentDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    const user = await this.userService.findOne(userId);

    const post = await this.postService.findOne(createCommentDto.postId);

    return this.commentService.create(createCommentDto, user, post);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }
}
