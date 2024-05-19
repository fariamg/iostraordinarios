import { ApiProperty } from "@nestjs/swagger";

export class CreatePublishDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ type: [Number] })
    tagsId: number[]; 

    @ApiProperty({ type: [Number] })
    superpowersId: number[]; 
}
