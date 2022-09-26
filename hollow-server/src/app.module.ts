import { Module } from '@nestjs/common';
import { CommonModule } from './apis/common/common.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './apis/user/user.module';
import { RedisService } from './utils/redis.service';

@Module({
  imports: [CommonModule, UserModule],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
