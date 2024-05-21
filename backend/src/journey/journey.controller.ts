import { Controller, Get, Body, Param, UseGuards, Post, Request, Patch, ParseIntPipe } from '@nestjs/common';
import { JourneyService } from './journey.service';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/@common/decorators/roles.decorator';
import { UserRole } from '../@common/enums/user-role.enum';
import { UserService } from 'src/user/user.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('journeys')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class JourneyController {
  constructor(
    private readonly journeyService: JourneyService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @Roles(UserRole.LEADER)
  @ApiBearerAuth('KEY_AUTH')
  async create(@Body() createJourneyDto: CreateJourneyDto, @Request() req) {
    const userId = req.user.id;
    return this.journeyService.create(createJourneyDto, userId);
  }

  @ApiBearerAuth('KEY_AUTH')
  @Get()
  findAll() {
    return this.journeyService.findAll();
  }

  @ApiBearerAuth('KEY_AUTH')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journeyService.findOne(+id);
  }

  @ApiBearerAuth('KEY_AUTH')
  @Post(':id/join')
  async joinJourney(@Param('id') journeyId: number, @Request() req) {
    const userId = req.user.id;
    await this.journeyService.joinJourney(userId, journeyId);
  }

  @Patch(':journeyId/complete')
  @ApiBearerAuth('KEY_AUTH')
  async completeJourney(
    @Param('journeyId', ParseIntPipe) journeyId: number,
    @Request() req
  ): Promise<void> {
    const userId = req.user.id;
    return this.journeyService.completeJourney(userId, journeyId);
  }
}