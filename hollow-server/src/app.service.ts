import { Injectable } from '@nestjs/common';
import { RedisService } from './utils/redis.service';
@Injectable()
export class AppService {
  constructor(
    public readonly redisService: RedisService
  ) {

  }
  async getHello(): Promise<string> {
    const v1 = await this.redisService.expire('k1', 100)
    console.log(v1)
    return 'Hello World!';
  }
}
