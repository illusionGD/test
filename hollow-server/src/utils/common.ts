import { BackCodeMap_Type } from 'src/interfaces/common.interface';

const BackCodeMap: BackCodeMap_Type = {
  /**返回成功-200 */
  RETURN_SUCCESS: '200',
};

export function backMsg(code?: string, message?: string, data?: any) {
  return {
    code: code || BackCodeMap.RETURN_SUCCESS,
    message: message || 'success',
    data,
  };
}
