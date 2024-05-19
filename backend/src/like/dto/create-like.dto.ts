import { likeFeeling } from "src/@common/enums/like-feeling.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLikeDto {
    @ApiProperty()
    postId: number;
    
    type: likeFeeling;
}
