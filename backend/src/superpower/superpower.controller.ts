import { Controller, Get, Param } from '@nestjs/common';
import { SuperpowerService } from './superpower.service';
import { Public } from '../@common/decorators/public.decorator';
import { Superpower } from './entities/superpower.entity';

@Controller('superpowers')
export class SuperpowerController {
  constructor(private readonly superpowerService: SuperpowerService) {}

  @Public()
  @Get()
  findAll() {
    return this.superpowerService.findAll();
  }

  @Get('ranking')
    async getRankingSuperpower(): Promise<Superpower[]> {
      return this.superpowerService.getRankingSuperpower();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superpowerService.findOne(+id);
  }

  
}
