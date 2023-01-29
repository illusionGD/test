const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
console.log("process.env.NODE_ENV", process.env.NODE_ENV)
module.exports = {
    entry: './src/efun-analytics.js',
    output: {
        filename: '[name][hash:10].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.link\.css$/i,
                use: [{
                        loader: 'style-loader',
                        options: {
                            injectType: 'linkTag'
                        }
                    },
                    {
                        loader: 'file-loader'
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        esModule: false // 处理url图片
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name][hash:10].[ext]',
                    },
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            // template: path.resolve(__dirname, './src/index.html')
            template: path.resolve(__dirname, './public/index.html'),
            inject: 'head', // 插入head标签中
            scriptLoading: 'blocking',
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
        new CleanWebpackPlugin()
    ],

    // 热更
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        hot: true,
        client: {
            overlay: {
                warnings: false, // 警告信息不提示
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
    target: 'web',
    mode: process.env.NODE_ENV
};