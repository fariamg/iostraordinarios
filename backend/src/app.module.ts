import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { dataSourceOptions } from '../db/data-source';
import { SuperpowerModule } from './superpower/superpower.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { TribeModule } from './tribe/tribe.module';
import { JourneyModule } from './journey/journey.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UserModule,
    SuperpowerModule,
    PostModule,
    TagModule,
    TribeModule,
    JourneyModule,
  ],
})
export class AppModule {}
