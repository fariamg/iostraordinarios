import { Injectable } from '@nestjs/common';
import { CreateSuperpowerDto } from './dto/create-superpower.dto';
import { Superpower } from './entities/superpower.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SuperpowerService {
  constructor(
    @InjectRepository(Superpower)
    private superpowerRepository: Repository<Superpower>
  ) {}

  async create(superpowerData: CreateSuperpowerDto): Promise<Superpower> {
    const newSuperpower = this.superpowerRepository.create(superpowerData);
    return this.superpowerRepository.save(newSuperpower);
  }

  findAll(): Promise<Superpower[]> {
    return this.superpowerRepository.find();
  }

  findOne(id: number): Promise<Superpower> {
    return this.superpowerRepository.findOne({ where: { id } });
  }
}
