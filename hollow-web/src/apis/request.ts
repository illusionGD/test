import { RespondData_Type } from "@/interfaces/common.interface";
import axios from "axios";

function request(config: any) {
    const baseConfig = {
        baseURL: import.meta.env.VITE_BASE_URL,
        timeout: 60000
    }
    const instance = axios.create()
    // 请求拦截器
    instance.interceptors.request.use(req => {
        return req
    })
    // 响应拦截器
    instance.interceptors.response.use((res): RespondData_Type => {
        const {status, data} = res

        if (status != 200) {
            throw new Error('请求错误')
        }
        return data as RespondData_Type
    })

    return instance(Object.assign(baseConfig, config))
}

export default request