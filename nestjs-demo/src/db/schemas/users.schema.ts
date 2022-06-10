import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop()
    @ApiProperty({
        description: '用户手机',
        example: '13200000020'
    })
    readonly phone: string;

    @Prop()
    @ApiProperty({
        description: '用户密码',
        example: '123456'
    })
    readonly password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
