import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Tag } from 'src/tag/entities/tag.entity';
import { Publish } from 'src/publish/entities/publish.entity';
import { Superpower } from 'src/superpower/entities/superpower.entity';
import { Journey } from 'src/journey/entities/journey.entity';
import { AuthModule } from 'src/auth/auth.module';

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
