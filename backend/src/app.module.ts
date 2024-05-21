import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { dataSourceOptions } from '../db/data-source';
import { SuperpowerModule } from './superpower/superpower.module';
import { TagModule } from './tag/tag.module';
import { JourneyModule } from './journey/journey.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { PublishModule } from './publish/publish.module';
import { LikeModule } from './like/like.module';
import { LikeSubscriber } from './like/entities/like.subscriber';
import { CommentModule } from './comment/comment.module';
import { UserSubscriber } from './user/entities/user.subscriber';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions, 
      subscribers: [LikeSubscriber, UserSubscriber] 
    }),
    AuthModule,
    UserModule,
    SuperpowerModule,
    PublishModule,
    TagModule,
    JourneyModule,
    LikeModule,
    CommentModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
