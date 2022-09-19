import { Injectable } from '@nestjs/common';
import { createClient } from 'redis'

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const client = createClient()

    client.on('ready', () => {
      console.log('redis ready');

    })
    await client.connect();
    return 'Hello World!';
  }
}
