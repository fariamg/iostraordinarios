import { Controller, Get, Post, Body, Req, Param, UseGuards} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserService } from 'src/user/user.service';
import { RequestWithUser } from 'src/@types/express-request.interface';
import { PublishService } from 'src/publish/publish.service';
import { Roles } from 'src/@common/decorators/roles.decorator';
import { UserRole } from 'src/@common/enums/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
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
