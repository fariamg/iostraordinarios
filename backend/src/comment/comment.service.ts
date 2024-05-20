import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Publish } from 'src/publish/entities/publish.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ) { }

  async create(createCommentDto: CreateCommentDto, creator: User, publish: Publish): Promise<Comment> {
    if (!creator || !publish) {
      throw new Error('User or publish not found');
    }
    
    const comment = this.commentRepository.create({
      ...createCommentDto,
      creator,
      publish,
    });
    return this.commentRepository.save(comment);
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['creator', 'publish']});
  }

  findOne(id: number): Promise<Comment> {
    return this.commentRepository.findOne({ where: { id }, relations: ['creator', 'publish']});
  }
}
