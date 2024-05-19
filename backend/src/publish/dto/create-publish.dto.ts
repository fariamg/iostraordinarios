import { ApiProperty } from "@nestjs/swagger";

export class CreatePublishDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    tags: number[]; 

    @ApiProperty()
    superpowers: number[]; 
}
