module.exports = {
  WEB_CDN_URL: 'E:\\efun-project\\web-cdn\\eu\\no\\no', // 连接符需要用\\，本次活动需求放置的本地web-cdn目录的绝对路径，如：E:\\efun-project\\web-cdn\\en\\test\\copy
  PC_PRE_FTP_URL: '/gw/no/pctest/event/no', // 本次活动pc预发布ftp静态服务器路径，如：/gw/smwm/event/pre
  PC_FTP_URL: '/gw/no/pc/event/no', // 本次活动pc正式ftp静态服务器路径，如：/gw/smwm/event/pre
  MB_PRE_FTP_URL: '/gw/no/mobiletest/event/no', // 本次活动mb预发布ftp静态服务器路径，如：/gw/smwm/event/pre
  MB_FTP_URL: '/gw/no/mobile/event/no', // 本次活动移动端正式ftp静态服务器路径，如：/gw/smwm/event/pre
  IS_TWO_DEVICE_CODE: '-1', // 是否为pc、mb两套代码，字符串，是(1)，不是(0)，暂未明确（-1），在运行efe start时会检测src文件夹的结构自动判断
  imgSrcUrl: 'src/images', // 图片压缩命令-e 选项，项目图片所在目录，多个目录用英文逗号连接，如src/pc/images,src/mobile/images
  imgDestUrl: 'src/images/optimized', //图片压缩命令-e 选项，图片压缩输出目录，多个目录用英文逗号连接，如src/pc/images/optimized,src/mobile/images/optimized
}
