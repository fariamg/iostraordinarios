import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthModule } from '../auth/auth.module';
import { PublishModule } from '../publish/publish.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), 
  AuthModule, UserModule, PublishModule],
  controllers: [LikeController],
  providers: [
    LikeService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [LikeService],
})
export class LikeModule {}
