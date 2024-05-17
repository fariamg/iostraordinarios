import { likeFeeling } from "src/@common/enums/like-feeling.enum";

export class CreateLikeDto {
    user_id: number;
    post_id: number;
    type: likeFeeling
}
