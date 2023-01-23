import { IsNumber, isNumber, IsString, isString, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
    @ApiProperty({example: 'John', description: 'Name'})
    @IsString()
    name: string;

    @ApiProperty({example: 'Good!', description: 'Title'})
    @IsString()
    title: string;

    @ApiProperty({example: 'I want more!', description: 'Description'})
    @IsString()
    description: string;

    @ApiProperty({example: '5', description: 'rating'})
    @Max(5, {message: 'Рейтинг не может быть больше 5'})
    @Min(1, {message: 'Рейтинг не может быть меньше 1'})
    @IsNumber()
    rating: number;

    @ApiProperty({example: 'productId', description: 'Product ID'})
    @IsString()
    productId: string;
}