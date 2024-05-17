import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Tag } from 'src/tag/entities/tag.entity';
import { Post } from 'src/post/entities/post.entity';
import { Superpower } from 'src/superpower/entities/superpower.entity';
import { Journey } from 'src/journey/entities/journey.entity';
import { Tribe } from 'src/tribe/entities/tribe.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Like } from 'src/like/entities/like.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tag, Post, Superpower, Journey, Tribe, Like, Comment]),
    AuthModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
