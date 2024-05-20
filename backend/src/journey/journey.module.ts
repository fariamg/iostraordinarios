import { Module } from '@nestjs/common';
import { JourneyService } from './journey.service';
import { JourneyController } from './journey.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journey } from './entities/journey.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { RolesGuard } from '../auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JourneyUser } from './entities/journeys_users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Journey, JourneyUser]), AuthModule, UserModule],
  controllers: [JourneyController],
  providers: [
    JourneyService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [JourneyService],

})
export class JourneyModule { }
