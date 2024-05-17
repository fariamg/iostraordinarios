import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SuperpowerService } from './superpower.service';
import { CreateSuperpowerDto } from './dto/create-superpower.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/@common/decorators/roles.decorator';
import { UserRole } from 'src/user/enum/user-role.enum';

@Controller('superpowers')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SuperpowerController {
  constructor(private readonly superpowerService: SuperpowerService) {}

  @Post()
  @Roles(UserRole.USER)
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
