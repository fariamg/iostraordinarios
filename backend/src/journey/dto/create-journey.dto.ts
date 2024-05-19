import { ApiProperty } from "@nestjs/swagger";

export class CreateJourneyDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    nuts: number;

    @ApiProperty({ type: [Number] })
    tagsId: number[];

    @ApiProperty({ type: [Number] })
    superpowersId: number[];
}
