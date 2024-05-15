import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Tag } from 'src/tag/entities/tag.entity';
import { Post } from 'src/post/entities/post.entity';
import { Superpower } from 'src/superpower/entities/superpower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tag, Post, Superpower])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
