import { Module } from '@nestjs/common';
import { SuperpowerService } from './superpower.service';
import { SuperpowerController } from './superpower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Superpower } from './entities/superpower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Superpower])],
  controllers: [SuperpowerController],
  providers: [SuperpowerService],
})
export class SuperpowerModule {}
