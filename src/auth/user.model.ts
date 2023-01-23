import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ApiProperty } from "@nestjs/swagger";

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {

    @ApiProperty({example: 'email@email.com', description: 'Email'})
    @prop({ unique: true })
    email: string;

    @ApiProperty({example: '123456', description: 'Password'})
    @prop()
    passwordHash: string;
}
