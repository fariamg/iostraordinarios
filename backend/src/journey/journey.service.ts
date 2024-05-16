import { Injectable } from '@nestjs/common';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { User } from 'src/user/entities/user.entity';
import { Journey } from './entities/journey.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JourneyService {
  constructor(
    @InjectRepository(Journey)
    private journeyRepository: Repository<Journey>
  ) {}

  async create(journeyData: CreateJourneyDto, creator: User): Promise<Journey> {
    const post = this.journeyRepository.create({
      ...journeyData,
      creator, 
    });
    return this.journeyRepository.save(post);
  }

  findAll(): Promise<Journey[]> {
    return this.journeyRepository.find();
  }

  findOne(id: number): Promise<Journey> {
    return this.journeyRepository.findOne({ where: { id } });
  }
}
