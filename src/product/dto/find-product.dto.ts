import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FindProductDto {
    @ApiProperty({example: 'Hoodie, hot', description: 'Categories'})
    @IsString()
    category: string;

    @ApiProperty({example: '5', description: 'Limit For Search'})
    @IsNumber()
    limit: number;
}