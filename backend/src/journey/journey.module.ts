import { Module } from '@nestjs/common';
import { JourneyService } from './journey.service';
import { JourneyController } from './journey.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journey } from './entities/journey.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { JourneyUser } from './entities/journey-user.entity';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';  // Adicione esta importação
import { RolesGuard } from '../auth/guards/roles.guard';  // Adicione esta importação
import { APP_GUARD } from '@nestjs/core';  // Adicione esta importação

@Module({
  imports: [
    TypeOrmModule.forFeature([Journey, JourneyUser]),
    AuthModule,
    UserModule,
  ],
  controllers: [JourneyController],
  providers: [
    JourneyService,
    JwtStrategy,  // Adicione esta linha
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [JourneyService],
})
export class JourneyModule {}
