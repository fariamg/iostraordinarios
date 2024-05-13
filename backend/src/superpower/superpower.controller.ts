import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SuperpowerService } from './superpower.service';
import { CreateSuperpowerDto } from './dto/create-superpower.dto';

@Controller('superpowers')
export class SuperpowerController {
  constructor(private readonly superpowerService: SuperpowerService) {}

  @Post()
  create(@Body() createSuperpowerDto: CreateSuperpowerDto) {
    return this.superpowerService.create(createSuperpowerDto);
  }

  @Get()
  findAll() {
    return this.superpowerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superpowerService.findOne(+id);
  }
}
