import { Controller, Get } from '@nestjs/common';
import { HomePathList_type } from 'src/interfaces/common.interface';
import { backMsg } from 'src/utils/common';
@Controller('common')
export class CommonController {
  @Get('getHomePaths')
  async getHomePaths() {
    const pathList: HomePathList_type = [
      {
        path: '/user',
        title: '空间',
      },
      {
        path: '/',
        title: '2',
      },
      {
        path: '/',
        title: '3',
      },
      {
        path: '/',
        title: '4',
      },
      {
        path: '/',
        title: '5',
      },
      {
        path: '/',
        title: '6',
      },
      {
        path: '/',
        title: '7',
      },
      {
        path: '/',
        title: '8',
      },
    ];
    return backMsg('', '', pathList);
  }
}
