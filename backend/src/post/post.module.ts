import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from './entities/post.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]),
    AuthModule, UserModule],
  controllers: [PostController],
  providers: [
    PostService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  exports: [PostService]
})
export class PostModule { }
