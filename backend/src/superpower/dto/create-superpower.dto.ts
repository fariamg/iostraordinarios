import { ApiProperty } from "@nestjs/swagger";

export class CreateSuperpowerDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;
}
