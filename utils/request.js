/*
 * 二次封装axios
 */

import axios from 'axios';

const base = process.env.VUE_APP_API_HOST;

export function request(config) {
  const baseConfig = {
    baseURL: base,
    timeout: 60000
  }
  const instance = axios.create();

  //请求拦截器
  instance.interceptors.request.use(config => {
    // 请求头加token
    const token = getToken();
    if (token) {
      config.headers['token'] = token;
    }

    return config;

  });

  //响应拦截器
  instance.interceptors.response.use(response => {
    const res = response.data;

    if (res.code !== 20000) { //请求失败处理 
    }

    // 将响应结果返回
    return res;
  });

  return instance(Object.assign(baseConfig, config));
}