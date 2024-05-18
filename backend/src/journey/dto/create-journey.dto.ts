import { ApiProperty } from "@nestjs/swagger";

export class CreateJourneyDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    nuts: number;

    @ApiProperty()
    tags: number[];

    @ApiProperty()
    superpowers: number[];
}
