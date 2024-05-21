import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class CreateJourneyDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    nuts: number;

    @ApiProperty({ type: [Number] })
    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    tagsId: number[];

    @ApiProperty({ type: [Number] })
    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    superpowersId: number[];
}
