import { RespondData_Type } from "@/interfaces/common.interface";
import request from "./request";

function requestPromise(config: Object): Promise<RespondData_Type> {
    return new Promise((resolve, reject) => {
        request(config).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export function getHomePaths(): Promise<RespondData_Type> {
    return requestPromise({
        url: 'common/getHomePaths'
    })
}

export function getWeatherInfo() {
    const key = '02c076caa8d8afe45e3bfcd968748e44'
    return requestPromise({
        url: `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${440100}`,
        method: 'get'
    })
}