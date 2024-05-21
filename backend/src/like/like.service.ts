import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Publish } from '../publish/entities/publish.entity';
import { UserService } from '../user/user.service';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    private readonly userService: UserService
  ) {}

  async create(createLikeDto: CreateLikeDto, creator: User, publish: Publish): Promise<any> {
    if (!creator || !publish) {
      throw new Error('User or publish not found');
    }

    const like = this.likeRepository.create({
      ...createLikeDto,
      creator,
      publish,
    });

    const savedLike = await this.likeRepository.save(like);

    await this.userService.incrementScoreAndInteractions(creator.id);

    const userResponse: UserResponseDto = {
      id: creator.id,
      fullName: creator.fullName,
      position: creator.position,
      superpower: creator.superpower,
    };

    return {
      ...savedLike,
      creator: userResponse, 
    };
  }

  async removeLike(publishId: number, creatorId: number): Promise<void> {
    const like = await this.likeRepository.findOne({ where: { 
      publish: { id: publishId } , 
      creator: { id: creatorId } }, 
      relations: ['publish'] } );

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.likeRepository.remove(like);
  }

  findAll(): Promise<Like[]> {
    return this.likeRepository.find({ relations: ['creator', 'publish'] });
  }

  findOne(id: number): Promise<Like | null> {
    return this.likeRepository.findOne({ where: { id }, relations: ['creator', 'publish']});
  }
}
