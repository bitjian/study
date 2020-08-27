const path = require("path")
module.exports = {
  // mode有两个属性值 development 和 production 区别是 production会对文件压缩，使用了跟多的webpack内置插件
  mode: 'development',
  // 1.配置文件的入口和出口
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',   // 出口的文件名
    path: path.join(__dirname, 'dist') // 出口的路径
  },
  // 配置loader
  module: {
    rules: [
      {
        // 当import时需要解析的文件
        test: /\.(png|jpg|gif)$/,
        // 使用的loader
        use: {
          loader: 'file-loader'
        }
      }
    ]
  }
}