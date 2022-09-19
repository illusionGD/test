import { Injectable } from '@nestjs/common'
import * as redis from 'redis'

@Injectable()
export class RedisService {
    constructor(
        public readonly client
    ) {
        this.client = redis.createClient()
    }

}