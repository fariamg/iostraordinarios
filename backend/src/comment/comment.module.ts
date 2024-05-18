import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { Comment } from './entities/comment.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
//import { PostService } from 'src/post/post.service';
import { PostModule } from 'src/post/post.module';
//import { Post } from 'src/post/entities/post.entity';
//import { User } from 'src/user/entities/user.entity';
import { CommentService } from './comment.service';
//import { UserService } from 'src/user/user.service';

@Module({
  imports:[TypeOrmModule.forFeature([Comment],), 
    UserModule, AuthModule, PostModule],
  controllers: [CommentController],
  providers: [
    CommentService,  
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  exports: [CommentService]
})
export class CommentModule {}
