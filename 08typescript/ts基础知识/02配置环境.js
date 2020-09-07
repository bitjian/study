// 拥有node环境
// 通过npm安装typescript,通过tsc来编译typescript
// npm install typescript -g
// 查看版本检查是否安装成功
// tsc --version
// 通过tsc来将typescript文件编译成javascript

// webpack配置
// 1. 创建一个目录
// 目录结构
  // - src //存放源文件
  // -- main.ts  // 入口文件
  // - build // 存放webpack配置文件
  // -- webpack.config.js
  // - index.html // 入口页面
// 2. 初始化npm npm init
// 3. 在项目中安装typescript npm -i typescript
// 4. 初始化tsconfig.json文件，通过tsc --init 初始化typescript配置文件,在lib可以加载额外的模块
// 5.配置tsconfig.json "lib": ["es6", "dom"],
// 6.安装并初始化tslint来约束代码 npm i tslint -g; tslint -i

// 7.安装webpack相关配置
// cnpm/npm install webpack webpack-cli webpack-dev-server -D
// 在package.json 里配置脚本
// "build": "cross-env NODE_ENV=development webpack-dev-server --mode=development --config build/webpack.config.js"
// 8. 安装 cross-env 可以在webpack.config.js中通过 process.env.NODE_ENV 来获取当前是开发还是生产环境  
//  devtool: process.env.NODE_ENV === "production" ? false : "inline-source-map",
// npm install cross-env -D
// 9.安装 ts-loader 来解析 .ts文件
// npm install ts-loader -D
// webpack.config.js配置对应的loader
// rules: [
//   {
//     test: /\.tsx?$/,
//     use: "ts-loader",
//     exclude: /node_modules/
//   }
// ]
// 10.安装 html-webpack-plugin 来配置入口视图
// npm install html-webpack-plugin -D
// plugins: [
//   new HtmlWebpackPlugin({
//     template: "./index.html"
//   })
// ]
// 在build文件夹中新建webpack.config.js 来配置webpack
// 在src文件家中新建main.ts 来编写代码