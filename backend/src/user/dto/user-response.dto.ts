import { ApiProperty } from "@nestjs/swagger";
import { Superpower } from "src/superpower/entities/superpower.entity";

export class UserResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    position: string;

    @ApiProperty()
    superpower: Superpower; 
  }