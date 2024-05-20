import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { Comment } from './entities/comment.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PublishModule } from 'src/publish/publish.module';
import { CommentService } from './comment.service';

@Module({
  imports:[TypeOrmModule.forFeature([Comment],), 
    UserModule, AuthModule, PublishModule],
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
