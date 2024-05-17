import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TribeService } from './tribe.service';
import { CreateTribeDto } from './dto/create-tribe.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/@common/decorators/roles.decorator';
import { UserRole } from 'src/user/enum/user-role.enum';

@Controller('tribes')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TribeController {
  constructor(private readonly tribeService: TribeService) {}

  @Post()
  @Roles(UserRole.USER)
  create(@Body() createTribeDto: CreateTribeDto) {
    return this.tribeService.create(createTribeDto);
  }

  @Get()
  findAll() {
    return this.tribeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tribeService.findOne(+id);
  }
}
