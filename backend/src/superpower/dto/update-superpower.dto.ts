import { PartialType } from '@nestjs/swagger';
import { CreateSuperpowerDto } from './create-superpower.dto';

export class UpdateSuperpowerDto extends PartialType(CreateSuperpowerDto) {}
