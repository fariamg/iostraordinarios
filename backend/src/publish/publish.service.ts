import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublishDto } from './dto/create-publish.dto';
import { Publish } from './entities/publish.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Superpower } from 'src/superpower/entities/superpower.entity';
import { UserResponseDto } from 'src/user/dto/user-response.dto'; // Importe o DTO aqui

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

  async create(createPublishDto: CreatePublishDto, userId: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tags = await this.tagRepository.find({
      where: { id: In(createPublishDto.tagsId) },
    });
    const superpowers = await this.superpowerRepository.find({
      where: { id: In(createPublishDto.superpowersId) },
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

    await this.publishRepository.save(publish);

    const userResponse: UserResponseDto = {
      id: user.id,
      fullName: user.fullName,
      position: user.position,
      superpower: user.superpower,
    };

    return {
      ...publish,
      creator: userResponse,
    };
  }

  findAll(): Promise<Publish[]> {
    return this.publishRepository.find({ relations: ['creator', 'superpowers', 'tags'] });
  }

  async findAllByLikes(): Promise<Publish[]> {
    return this.publishRepository.createQueryBuilder('publish')
      .leftJoinAndSelect('publish.likes', 'like')
      .loadRelationCountAndMap('publish.likesCount', 'publish.likes')
      .orderBy('publish.likesCount', 'DESC')
      .getMany();
  }

  findOne(id: number): Promise<Publish> {
    return this.publishRepository.findOne({ where: { id } });
  }
}
