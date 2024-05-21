import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { User } from '../user/entities/user.entity';
import { Journey } from './entities/journey.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag/entities/tag.entity';
import { Superpower } from '../superpower/entities/superpower.entity';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { JourneyUser } from './entities/journey-user.entity';

@Injectable()
export class JourneyService {
  constructor(
    @InjectRepository(Journey)
    private journeyRepository: Repository<Journey>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Superpower)
    private superpowerRepository: Repository<Superpower>,
    @InjectRepository(JourneyUser)
    private journeyUserRepository: Repository<JourneyUser>,
  ) {}

  async create(createJourneyDto: CreateJourneyDto, id: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...userWithoutPassword } = user;

    const tags = await this.tagRepository.find({ where: { id: In(createJourneyDto.tagsId) } });
    const superpowers = await this.superpowerRepository.find({ where: { id: In(createJourneyDto.superpowersId) } });

    const journey = this.journeyRepository.create({
      ...createJourneyDto,
      creator: userWithoutPassword,
      tags,
      superpowers,
    });

    await this.journeyRepository.save(journey);

    const userResponse: UserResponseDto = {
      id: user.id,
      fullName: user.fullName,
      position: user.position,
      superpower: user.superpower,
    };

    return {
      ...journey,
      creator: userResponse,
    };
  }

  findAll(): Promise<Journey[]> {
    return this.journeyRepository.find({ relations: ['creator', 'superpowers', 'tags'] });
  }

  findOne(id: number): Promise<Journey> {
    return this.journeyRepository.findOne({ where: { id } });
  }

  async joinJourney(userId: number, journeyId: number): Promise<void> {
    const journey = await this.journeyRepository.findOne({ where: { id: journeyId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!journey || !user) {
      throw new NotFoundException('Journey or user not found');
    }

    const journeyUser = this.journeyUserRepository.create({ user, journey });
    await this.journeyUserRepository.save(journeyUser);
  }

  async completeJourney(userId: number, journeyId: number): Promise<void> {
    const journeyUser = await this.journeyUserRepository.findOne({ where: { user: { id: userId }, journey: { id: journeyId } } });
    
    if (!journeyUser) {
      throw new NotFoundException('Journey participation not found.');
    }

    journeyUser.completed = true;
    journeyUser.completedAt = new Date();

    await this.journeyUserRepository.save(journeyUser);

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const journey = await this.journeyRepository.findOne({ where: { id: journeyId } });

    user.score += 100;
    user.nuts += journey.nuts;
    user.journeysCompleted += 1;

    await this.userRepository.save(user);
  }
}
