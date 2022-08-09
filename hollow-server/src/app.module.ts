import { Module } from '@nestjs/common';
import { CommonModule } from './apis/common/common.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './apis/user/user.module';

@Module({
  imports: [CommonModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
