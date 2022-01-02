const path = require('path');
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {merge} = require('webpack-merge');

function resolve(dir) {
  return path.join(process.cwd(), dir);
}

const isProduction = (process.env.NODE_ENV === 'production');

const baseConfig = {
  entry: [resolve('./src/index.ts'), resolve('./src/index.html')],

  output: {
    path: resolve('./dist'),
    filename: 'js/[contenthash:7].js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"]
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        type: 'asset',
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
        test: /\.html$/,
        use: ["html-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('./src/index.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.json']
  }
}

const config = isProduction ? prodConfig : devConfig;

module.exports = merge(baseConfig, config);
