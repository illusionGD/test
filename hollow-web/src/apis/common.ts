import { RespondData_Type } from "@/interfaces/common.interface";
import request from "./request";

export function getHomePaths(): Promise<RespondData_Type> {
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