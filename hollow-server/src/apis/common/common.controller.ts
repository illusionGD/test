import { Controller, Get } from '@nestjs/common';
import { homePathList_type } from 'src/types/common';

@Controller('common')
export class CommonController {
  @Get('getHomePaths')
  async getHomePaths() {
    const pathList: homePathList_type = [
      {
        path: '/user',
        title: 'user',
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
    return pathList;
  }
}
