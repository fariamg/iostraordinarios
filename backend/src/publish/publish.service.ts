import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublishDto } from './dto/create-publish.dto';
import { Publish } from './entities/publish.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Superpower } from 'src/superpower/entities/superpower.entity';

@Injectable()
export class PublishService {
  constructor(
    @InjectRepository(Publish)
    private publishRepository: Repository<Publish>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Superpower)
    private superpowerRepository: Repository<Superpower>,
  ) {}

  async create(createPublishDto: CreatePublishDto, userId: number): Promise<Publish> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tags = await this.tagRepository.find({
      where: { id: In(createPublishDto.tags) },
    });
    const superpowers = await this.superpowerRepository.find({
      where: { id: In(createPublishDto.superpowers) },
    });

    if (!tags || tags.length === 0) {
      throw new NotFoundException('Tags not found');
    }

    if (!superpowers || superpowers.length === 0) {
      throw new NotFoundException('Superpowers not found');
    }

    const publish = this.publishRepository.create({
      ...createPublishDto,
      creator: user,
      tags,
      superpowers,
    });

    return this.publishRepository.save(publish);
  }

  findAll(): Promise<Publish[]> {
    return this.publishRepository.find();
  }

  findOne(id: number): Promise<Publish> {
    return this.publishRepository.findOne({ where: { id } });
  }
}
