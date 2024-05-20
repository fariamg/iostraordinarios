import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty()
    body: string;

    @ApiProperty()
    publishId: number;
}