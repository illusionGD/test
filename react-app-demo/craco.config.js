// 通过craco插件更改reactwebpack配置
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1DA57A',
              '@link-color': '#1890ff'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};