import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../../@common/enums/user-role.enum";
import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsInt, IsArray, ArrayNotEmpty } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'O nome completo não pode ser vazio' })
    fullName: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'A senha não pode ser vazia' })
    @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    password: string;

    @ApiProperty()
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'A posição não pode ser vazia' })
    position: string;

    @ApiProperty({ example: 'user' })
    @IsEnum(UserRole, { message: 'Função inválida' })
    role: UserRole;

    @ApiProperty()
    @IsInt({ message: 'superpowerId deve ser um número inteiro' })
    superpowerId: number; 

    @ApiProperty({ type: [Number] })
    @IsArray({ message: 'tagsId deve ser um array' })
    @ArrayNotEmpty({ message: 'tagsId não pode ser vazio' })
    @IsInt({ each: true, message: 'Cada tagId deve ser um número inteiro' })
    tagsId: number[]; 
}
