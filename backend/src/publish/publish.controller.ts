import {
  Controller,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { PublishService } from './publish.service';
import { CreatePublishDto } from './dto/create-publish.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('publishes')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PublishController {
  constructor(private readonly publishService: PublishService) {}

  @Post()
  async create(@Body() createPublishDto: CreatePublishDto, @Request() req) {
    const userId = req.user.id;
    return this.publishService.create(createPublishDto, userId);
  }

  @Get()
  findAll() {
    return this.publishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publishService.findOne(+id);
  }
}
