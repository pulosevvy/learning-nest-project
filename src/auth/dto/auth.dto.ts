import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {

    @ApiProperty({example: 'email@email.com', description: 'Email'})
    @IsString()
    login: string;

    @ApiProperty({example: '1123456', description: 'Password'})
    @IsString()
    password: string;
}