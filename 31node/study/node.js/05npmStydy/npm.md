npm：node package manage
node的包管理器

npm list | grep underscore
查看node_modules安装的包
| grep package 通过管道符匹配对应包

npm info 查看包的信息

npm view package version
查看包的版本信息

npm i package -D 
安装包到开发环境
npm i package -S
安装包到生产环境


package 的版本格式介绍
 1 .   12    .   1  
major  minor     patch
^: 标识锁定major 大版本
~: 标识锁定minor 小版本
*: 表示 安装最新 版本
'1.13.1': 表示安装固定版本


npm outdated
查看安装的包版本 和 最新版本

npm 脚本
  &是并行执行脚本  && 是需要等前一个执行完才执行后面的
 "start":"node ./test1.js & node ./test2.js"
  "start":"node ./test1.js && node ./test2.js"

npm 变量
  通过脚本运行可以通过 process.env.npm_package_${value} 访问变量

cross-env 使用
 cross-en跨平台设置和使用环境变量
  当在脚本使用 NODE_ENV=production windows会报错，windows的bash不让设置，这时通过安装 corss-env可以解决
  "start":"cross-env NODE_ENV=production & node ./test1.js & node ./test2.js"

npx 使用
 npx node package extention
 npx可以通过 npx mocha --version 来直接使用包
 如果本地没有安装对应的包， npx会下载并存放到一个临时文件夹下
 --no-install参数和--ignore-existion参数
 --no-install 就是不安装远程的，本地没有就报错
 --ignore-existion: 忽略本地存在的包，使用远程最新的