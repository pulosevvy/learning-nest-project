import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop } from "@typegoose/typegoose";
import { ProductModule } from "./product.module";
import { ApiProperty } from "@nestjs/swagger";

class ProductCharacteristic {
    @ApiProperty({example: 'Hoodie', description: 'Name For Characteristics'})
    @prop()
    name: string;

    @ApiProperty({example: 'Kofta', description: 'Value For Characteristics'})
    @prop()
    value: string;
}

export interface ProductModel extends Base {}

export class ProductModel extends TimeStamps {
    @ApiProperty({example: '1.jpg', description: 'Image'})
    @prop()
    image: string;

    @ApiProperty({example: 'Hoodie', description: 'Title'})
    @prop()
    title: string;

    @ApiProperty({example: '132', description: 'Price'})
    @prop()
    price: number;

    @ApiProperty({example: '150', description: 'Old Price'})
    @prop()
    oldPrice?: number;

    @ApiProperty({example: '10', description: 'Credit in Month'})
    @prop()
    credit: number;

    @ApiProperty({example: 'Good Hoodie', description: 'Description'})
    @prop()
    description: string;

    @ApiProperty({example: 'Good', description: 'Advantage'})
    @prop()
    advantages: string;

    @ApiProperty({example: 'Not Good', description: 'Disadvantages'})
    @prop()
    disAdvantages: string;

    @ApiProperty({example: 'Hoodie, Zippo', description: 'Categories'})
    @prop({ type: () => [String] })
    categories: string[];

    @ApiProperty({example: 'winter, for men, for women', description: ''})
    @prop({ type: () => [String] })
    tags: string[];


    @prop({ type: () => [ProductCharacteristic], _id: false })
    characteristics: ProductCharacteristic[];

}
