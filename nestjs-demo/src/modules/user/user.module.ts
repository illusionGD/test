import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { USER_MODLES } from 'src/db/db.module';
import { HashPasswordMiddleware } from 'src/middlewares/hash-password.middleware';

@Module({
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HashPasswordMiddleware)
      .forRoutes('user/regist')
  }
}
