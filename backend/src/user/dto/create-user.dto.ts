import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../../@common/enums/user-role.enum";

export class CreateUserDto {
    @ApiProperty()
    fullName: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    position: string;

    @ApiProperty({ example: 'user' })
    role: UserRole;

    @ApiProperty()
    superpowerId: number; 

    @ApiProperty({ type: [Number] })
    tagsId: number[]; 
}