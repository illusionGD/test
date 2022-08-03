import { turntable_type } from "@/types/home";
import request from "./request";

export function getHomePaths(): Promise<turntable_type[]> {
    return new Promise((resolve, reject) => {
        request({
            url: 'common/getHomePaths'
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}