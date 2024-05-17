import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';


@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>
  ) {}

  async create(createLikeDto: CreateLikeDto): Promise<Like> {
    const newLike = this.likeRepository.create(createLikeDto);
    return this.likeRepository.save(newLike);
  }

  async removeLike(id: number): Promise<void> {
    await this.likeRepository.delete(id);
  }

  findAll(): Promise<Like[]> {
    return this.likeRepository.find();
  }

  findOne(id: number): Promise<Like | null> {
    return this.likeRepository.findOneBy({ id });
  }
}