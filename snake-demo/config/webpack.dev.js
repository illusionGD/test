module.exports = {
  mode: 'development',
  devServer: {
    compress: true,
    port: 3000,
    hot: true
  },
  devtool: 'cheap-module-source-map',
  target: 'web'
}