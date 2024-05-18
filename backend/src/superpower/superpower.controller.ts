import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SuperpowerService } from './superpower.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('superpowers')
@UseGuards(RolesGuard) 
export class SuperpowerController {
  constructor(private readonly superpowerService: SuperpowerService) {}

  @Get()
  findAll() {
    return this.superpowerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superpowerService.findOne(+id);
  }
}
