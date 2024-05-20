import { Module } from '@nestjs/common';
import { SuperpowerService } from './superpower.service';
import { SuperpowerController } from './superpower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Superpower } from './entities/superpower.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Superpower]),
    AuthModule,
    UserModule
  ],
  controllers: [SuperpowerController],
  providers: [
    SuperpowerService,
    // JwtStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class SuperpowerModule {}
