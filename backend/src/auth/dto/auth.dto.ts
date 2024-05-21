import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthPayloadDto {
    @ApiProperty()
    @IsEmail({}, { message: 'Email inválido' })
    email: string;
    
    @ApiProperty()
    @IsNotEmpty({ message: 'A senha não pode ser vazia' })
    password: string;
}