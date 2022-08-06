export interface HomePath_type {
  path: string;
  title: string;
}

export interface HomePathList_type {
  [index: number]: HomePath_type;
}

export interface BackCodeMap_Type {
  /**返回成功-200 */
  RETURN_SUCCESS?: string;
}
