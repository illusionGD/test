import { Injectable } from '@nestjs/common'
import { createClient, RedisClientType } from 'redis'

@Injectable()
export class RedisService {
    client: RedisClientType
    constructor() {
        this.init()
    }

    private async init() {
        this.client = createClient()
        this.client.on('ready', () => {
            console.log('redis connection');
        })
        await this.client.connect();
    }

    /**
     * @description: 获取key对应的value值
     * @param {string} key string
     * @return {*}
     */
    async get(key: string) {
        return await this.client.get(key)
    }

    /**
     * @description: 设置key-value
     * @param {string} key
     * @param {any} val
     */
    async set(key: string, val: any) {
        return await this.client.set(key, val)
    }

    /**
     * @description: 是否存在key值
     * @param {string} key
     * @return {number} 0-不存在，1-存在
     */
    async exists(key: string) {
        return await this.client.exists(key)
    }

    /**
     * @description: 删除key键值对
     * @param {string} key
     * @return {number} 0-删除失败，1-删除成功
     */
    async del(key: string) {
        return await this.client.del(key)
    }

    /**
     * @description: 设置key的存在时长
     * @param {string} key
     * @param {number} time 时长(ms)
     * @return {boolean} boolean
     */
    async expire(key: string, time: number) {
        return await this.client.expire(key, time)
    }

    /**
     * @description: key的值的类型
     * @param {string} key
     * @return {string} string
     */
    async type(key: string) {
        return await this.client.type(key)
    }
}