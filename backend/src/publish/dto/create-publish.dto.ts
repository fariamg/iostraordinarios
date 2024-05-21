import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, IsInt, IsOptional } from "class-validator";

export class CreatePublishDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'O título não pode ser vazio' })
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
    description: string;

    @ApiProperty({ type: [Number] })
    @IsArray()
    @ArrayNotEmpty({ message: 'tagsId não pode ser vazio' })
    @IsInt({ each: true, message: 'Cada tagId deve ser um número inteiro' })
    tagsId: number[]; 

    @ApiProperty({ type: [Number] })
    @IsArray()
    @IsOptional() 
    @IsInt({ each: true, message: 'Cada superpowerId deve ser um número inteiro' })
    superpowersId: number[]; 
}
