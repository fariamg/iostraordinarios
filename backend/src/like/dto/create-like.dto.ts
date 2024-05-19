import { LikeFeeling } from "src/@common/enums/like-feeling.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLikeDto {
    @ApiProperty()
    publishId: number;
    
    @ApiProperty()
    type: LikeFeeling;
}
