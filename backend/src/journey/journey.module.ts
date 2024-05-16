import { Module } from '@nestjs/common';
import { JourneyService } from './journey.service';
import { JourneyController } from './journey.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journey } from './entities/journey.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Journey]),
    AuthModule, UserModule],
  controllers: [JourneyController],
  providers: [JourneyService, JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }],
})
export class JourneyModule { }
