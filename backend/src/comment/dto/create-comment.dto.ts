import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty()
    @IsString() 
    @IsNotEmpty() 
    body: string;

    @ApiProperty()
    @IsNumber() 
    @IsNotEmpty() 
    publishId: number;
}
