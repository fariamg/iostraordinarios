import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Superpower } from 'src/superpower/entities/superpower.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Superpower)
    private superpowerRepository: Repository<Superpower>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tags = await this.tagRepository.find({ where: { id: In(createPostDto.tags) } });
    const superpowers = await this.superpowerRepository.find({ where: { id: In(createPostDto.superpowers) } });

    if (!tags || tags.length === 0) {
      throw new NotFoundException('Tags not found');
    }

    if (!superpowers || superpowers.length === 0) {
      throw new NotFoundException('Superpowers not found');
    }

    const post = this.postRepository.create({
      ...createPostDto,
      creator: user,
      tags,
      superpowers,
    });

    return this.postRepository.save(post);
  }

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }
}
