import { Module } from '@nestjs/common';
import { TribeService } from './tribe.service';
import { TribeController } from './tribe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tribe } from './entities/tribe.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tribe]), 
  AuthModule, UserModule],
  controllers: [TribeController],
  providers: [
    TribeService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class TribeModule {}
