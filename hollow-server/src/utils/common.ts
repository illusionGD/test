import { BackCodeMap_Type } from 'src/interfaces/common.interface';
import { Request } from 'express';

const BackCodeMap: BackCodeMap_Type = {
  /**返回成功-200 */
  RETURN_SUCCESS: '200',
};

export const CommonUtil = {
  /**
   * 返回JSON数据到前端
   * @param {String} code 可选，默认值为成功code
   * @param {String} message 可选，默认值为success
   * @param {Object} data 可选
   * @returns {String | Object} jsonp-string,other-json
   */
  backMsg(code?: string, message?: string, data?: any) {
    return {
      code: code || BackCodeMap.RETURN_SUCCESS,
      message: message || 'success',
      data,
    };
  },

  /**
   * 获取前端传来的参数，自动判断是get/post 返回对应的参数
   * @param {Object} 一整个Request对象，包含headers属性的，不能为Query
   */
  getUrlParams(request) {
    return request.method === 'GET' ? request.query : request.body;
  },

  getClientIp(request: Request): string {
    const ip = (request.headers['x-forwarded-for'] ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress ||
      (request.connection as any).socket.remoteAddress) as string;

    if (ip.includes(',')) {
      const ipArr = ip.split(',');
      return ipArr[ipArr.length - 1].trim();
    }
    return ip;
  },
};
