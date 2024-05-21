import { LikeFeeling } from "../../@common/enums/like-feeling.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
    @ApiProperty()
    @IsEnum(LikeFeeling) 
    type: LikeFeeling;
    
    @ApiProperty()
    @IsNumber() 
    @IsNotEmpty()
    publishId: number;
}
