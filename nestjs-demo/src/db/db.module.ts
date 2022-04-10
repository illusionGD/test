import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/db/schemas/users.schema';

export const USER_MODLES = MongooseModule.forFeature([{ name: 'USER_MODEL', schema: UserSchema }])

@Global()
@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/nest_test'),
        USER_MODLES
    ],
    exports: [USER_MODLES]
})
export class DbModule {}
