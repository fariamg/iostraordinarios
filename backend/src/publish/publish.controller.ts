import { Controller, Get, Body, Param, UseGuards, Request, Post } from '@nestjs/common';
import { PublishService } from './publish.service';
import { CreatePublishDto } from './dto/create-publish.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Publish } from './entities/publish.entity';

@Controller('publishes')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PublishController {
  constructor(private readonly publishService: PublishService) {}

  @ApiBearerAuth('KEY_AUTH')
  @Post()
  async create(@Body() createPublishDto: CreatePublishDto, @Request() req) {
    const userId = req.user.id;
    return this.publishService.create(createPublishDto, userId);
  }

  @ApiBearerAuth('KEY_AUTH')
  @Get()
  @ApiResponse({ status: 200, description: 'Return all publishes', type: [Publish] })
  findAll() {
    return this.publishService.findAll();
  }

  @ApiBearerAuth('KEY_AUTH')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publishService.findOne(+id);
  }
}
