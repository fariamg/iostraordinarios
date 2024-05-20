import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Tag } from '../tag/entities/tag.entity';
import { Publish } from '../publish/entities/publish.entity';
import { Superpower } from '../superpower/entities/superpower.entity';
import { Journey } from '../journey/entities/journey.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tag, Publish, Superpower, Journey]),
    AuthModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
