
import { Controller, Get, Body, Param, UseGuards, Req, Post } from '@nestjs/common';
import { JourneyService } from './journey.service';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/@common/decorators/roles.decorator';
import { UserRole } from 'src/user/enum/user-role.enum';
import { UserService } from 'src/user/user.service';
import { RequestWithUser } from 'src/@types/express-request.interface';

@Controller('journeys')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class JourneyController {
  constructor(
    private readonly journeyService: JourneyService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @Roles(UserRole.LEADER)
  async create(@Body() createJourneyDto: CreateJourneyDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    const user = await this.userService.findOne(userId);
    return this.journeyService.create(createJourneyDto, user);
  }

  @Get()
  findAll() {
    return this.journeyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journeyService.findOne(+id);
  }
}
