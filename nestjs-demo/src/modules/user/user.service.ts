import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/db/schemas/users.schema';
import { Model } from 'mongoose';
import { CResponse } from 'src/interfaces/response.interface';

@Injectable()
export class UserService {
    response: CResponse;
    constructor(@InjectModel('USER_MODEL') private readonly userModel: Model<User>) {}

    public async regist(user: User) {
        const res = await this.userModel.find({phone: user.phone});
        
        if (res.length) {
            console.log('用户已注册');
            throw new Error("用户已注册");
        }
        const createModel = new this.userModel(user);
        createModel.save();

        return this.response = {
            code: '1000',
            message: ' 注册成功'
        }
    }
}
