const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const  { CleanWebpackPlugin }  =  require ('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name][contenthash:10].js',
    // publicPath: './' // v5后，html处理img时要加publicPath，加了后devServe会出问题
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  esModule: false // 处理url图片
                }
              },
              'postcss-loader'
            ]
          },
          {
            test: /\.less$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  esModule: false
                }
              },
              'postcss-loader',
              'less-loader'
            ]
          },
          {
            test:/\.(png|gif|svg|jpe?g)$/,
            type:"asset",
            parser: {
              dataUrlCondition: {
                maxSize: 5 * 1024
              }
            },
            generator: {
              filename:'imgs/[contenthash:8][ext]'
            }
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: 'asset/resource',
            generator: {
              filename:'font/[name][hash:3][ext]',
            }
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
                options: {
                  esModule: false
                }
              }
            ]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }
        ]  
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-demo',
      template: path.resolve(__dirname, './public/index.html'),
      favicon: path.resolve(__dirname, './public/favicon.ico'),
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name][contenthash:8].css'
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // 压缩css，会和webpack5自带的js压缩有冲突，js压缩用TerserPlugin
      new CssMinimizerPlugin({
        exclude: /node_modules/
      })
    ],
    // 将node_modules的js打包成另一个文件
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    hot: true,
    // 代理
    proxy: {
      '/api': {
        target: 'https://www.baidu.com', // 目的地址，会将/api前的localhost替换成该地址，如：https://www.baidu.com/api/
        pathRewrite: {"^/api": ""},  // 重写路径，根据后端接口修改，这里是去掉了/api，https://www.baidu.com/
        changeOrigin: true  // 改变请求源（localhost：），因为有些网站做了校验，如果是本地地址访问是不行的
      }
    }
  },
  // 模块解析
  resolve: {
    extensions: ['.js', '.json'], // 用于引入模块时少写后缀名，自动解析
    alias: {
      "@": path.resolve(__dirname, 'src/') // 别名，可以给路径起别名，全局使用
    }
  },
  target: 'web', // 解决热更新冲突
  externals: {
    jquery: 'jQuery' // 拒绝打包，可以通过cdn引入
  },
  mode: process.env.NODE_ENV
}