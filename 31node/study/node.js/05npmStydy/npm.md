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