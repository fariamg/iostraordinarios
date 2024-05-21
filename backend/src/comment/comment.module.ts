import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { Comment } from './entities/comment.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { PublishModule } from '../publish/publish.module';
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
