import { IsNumber, IsString, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

class ProductCharacteristicsDto {
    @ApiProperty({example: 'Hoodie', description: 'Name For Characteristics'})
    @IsString()
    name: string;

    @ApiProperty({example: 'Kofta', description: 'Value For Characteristics'})
    @IsString()
    value: string;
}


export class CreateProductDto {
    @ApiProperty({example: '1.jpg', description: 'Image'})
    @IsString()
    image: string;

    @ApiProperty({example: 'Hoodie', description: 'Title'})
    @IsString()
    title: string;

    @ApiProperty({example: '132', description: 'Price'})
    @IsNumber()
    price: number;

    @ApiProperty({example: '150', description: 'Old Price'})
    @IsOptional()
    @IsNumber()
    oldPrice?: number;

    @ApiProperty({example: '10', description: 'Credit in Month'})
    @IsNumber()
    credit: number;

    @ApiProperty({example: 'Good Hoodie', description: 'Description'})
    @IsString()
    description: string;

    @ApiProperty({example: 'Good', description: 'Advantage'})
    @IsString()
    advantages: string;

    @ApiProperty({example: 'Not Good', description: 'Disadvantages'})
    @IsString()
    disAdvantages: string;

    @ApiProperty({example: 'Hoodie, Zippo', description: 'Categories'})
    @IsArray()
    @IsString({ each: true })
    categories: string[];

    @ApiProperty({example: 'winter, for men, for women', description: ''})
    @IsArray()
    @IsString({each: true})
    tags: string[];

    @ValidateNested()
    @IsArray()
    @Type(() => ProductCharacteristicsDto)
    characteristics: ProductCharacteristicsDto[];
}