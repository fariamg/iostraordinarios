import { Injectable } from '@nestjs/common';
import { Superpower } from './entities/superpower.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SuperpowerService {
  constructor(
    @InjectRepository(Superpower)
    private superpowerRepository: Repository<Superpower>
  ) {}

  findAll(): Promise<Superpower[]> {
    return this.superpowerRepository.find();
  }

  findOne(id: number): Promise<Superpower> {
    return this.superpowerRepository.findOne({ where: { id } });
  }
}
