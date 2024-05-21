import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Publish } from '../publish/entities/publish.entity';
import { UserService } from '../user/user.service';
import { UserResponseDto } from '../user/dto/user-response.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly userService: UserService
  ) { }

  async create(createCommentDto: CreateCommentDto, creator: User, publish: Publish): Promise<any> {
    if (!creator || !publish) {
      throw new Error('User or publish not found');
    }

    const comment = this.commentRepository.create({
      ...createCommentDto,
      creator,
      publish,
    });

    const savedComment = await this.commentRepository.save(comment);

    await this.userService.incrementScoreAndInteractions(creator.id);

    const userResponse: UserResponseDto = {
      id: creator.id,
      fullName: creator.fullName,
      position: creator.position,
      superpower: creator.superpower,
    };

    return {
      ...savedComment,
      creator: userResponse,
    };
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['creator', 'publish']});
  }

  findOne(id: number): Promise<Comment> {
    return this.commentRepository.findOne({ where: { id }, relations: ['creator', 'publish']});
  }
}
