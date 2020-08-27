// 拥有node环境
// 通过npm安装typescript,通过tsc来编译typescript
// 通过tsc来讲typescript文件编译成javascript

// webpack配置
// 创建一个目录
// 目录结构
  // - src //存放源文件
  // - build // 存放webpack配置文件
  // - index.html // 入口页面
// 初始化npm npm init
// 在项目中安装typescript npm -i typescript
// 初始化tsconfig.json文件，通过tsc --init 初始化typescript配置文件,在lib可以加载额外的模块
// 安装并配置tslint来约束代码 npm i tslint -g; tslint -i

// 开始webpack配置
// cnpm/npm install webpack webpack-cli webpack-dev-server -D
// 在package.json 里配置脚本
// "build": "cross-env NODE_ENV=development webpack-dev-server --mode=development --config build/webpack.config.js"
// 安装 cross-env 判断当前是开发环境还是生产环境
// 安装 ts-loader 来解析 .ts文件
// 安装 html-webpack-plugin 来配置入口视图
// 在build文件夹中新建webpack.config.js 来配置webpack
// 在src文件家中新建main.ts 来编写代码