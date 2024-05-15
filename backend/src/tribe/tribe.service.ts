import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTribeDto } from './dto/create-tribe.dto';
import { Tribe } from './entities/tribe.entity';

@Injectable()
export class TribeService {
  constructor(
    @InjectRepository(Tribe)
    private tribeRepository: Repository<Tribe>
  ) {}

  async create(createTribeDto: CreateTribeDto): Promise<Tribe> {
    const newTribe = this.tribeRepository.create(createTribeDto);
    return this.tribeRepository.save(newTribe);
  }

  findAll(): Promise<Tribe[]> {
    return this.tribeRepository.find();
  }

  findOne(id: number): Promise<Tribe> {
    return this.tribeRepository.findOne({ where: { id } });
  }
}