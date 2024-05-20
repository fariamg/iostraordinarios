import { Controller, Get, Param } from '@nestjs/common';
import { SuperpowerService } from './superpower.service';
import { Public } from '../@common/decorators/public.decorator';

@Controller('superpowers')
export class SuperpowerController {
  constructor(private readonly superpowerService: SuperpowerService) {}

  @Public()
  @Get()
  findAll() {
    return this.superpowerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superpowerService.findOne(+id);
  }
}
