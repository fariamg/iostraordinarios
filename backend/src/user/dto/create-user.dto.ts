import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "src/@common/enums/user-role.enum";

export class CreateUserDto {
    @ApiProperty()
    fullName: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    position: string;

    @ApiProperty()
    role: UserRole;
}