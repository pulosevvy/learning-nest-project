import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose"
import { ApiProperty } from "@nestjs/swagger";

export interface ReviewModel extends Base {}

export class ReviewModel extends TimeStamps {
    @ApiProperty({example: 'John', description: 'Name'})
    @prop()
    name: string;

    @ApiProperty({example: 'Good!', description: 'Title'})
    @prop()
    title: string;

    @ApiProperty({example: 'I want more!', description: 'Description'})
    @prop()
    description: string;

    @ApiProperty({example: '5', description: 'rating'})
    @prop()
    rating: number;

    @ApiProperty({example: 'productId', description: 'Product ID'})
    @prop()
    productId: Types.ObjectId;

}

