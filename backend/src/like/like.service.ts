import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';


@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>
  ) {}

  async create(createLikeDto: CreateLikeDto, creator: User, publish: Post): Promise<Like> {
    const newLike = this.likeRepository.create(
      {
        ...CreateLikeDto, 
      creator, 
      publish,
    }
    );
    return this.likeRepository.save(newLike);
  }

  async removeLike(id: number): Promise<void> {
    await this.likeRepository.delete(id);
  }

  findAll(): Promise<Like[]> {
    return this.likeRepository.find({ relations: ['creator', 'publish'] });
  }

  findOne(id: number): Promise<Like | null> {
    return this.likeRepository.findOneBy({ id });
  }
}