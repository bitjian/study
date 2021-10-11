## 基于vue-element-admin项目升级webpack5
### 1.升级webpack和相关插件

>项目使用到的依赖比较多，一个一个升级太慢，这里用到 `npm-check-updates` 一键升级
>  #### 1.安装npm-check-updates 
>```cnpm i npm-check-updates -g```
> #### 2.在package.json的跟目录下执行npm-check-updates
> ```npm-check-updates```  
> ![check-updates](./img/checkupdates.png)
> #### 3.执行ncu -u 检查package.json文件,执行完后package.json里面依赖版本都变成最新的版本，我们只需要升级webapck和相关插件的版本，其他webpack没有用到的可以先还原
> ```ncu -u```  
> ![package-update](./img/packageupdate.png)
> #### 4.执行`npm i `安装更新后的依赖包
> #### 5. 修改package.json里dev启动命令
>  ``` "dev": "cross-env BABEL_ENV=development webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"```  
> 替换为  
> ```"dev": "cross-env BABEL_ENV=development webpack server --config build/webpack.dev.conf.js --color --progress"```  

>到这webpack5包升级操作就完成了，接下来大家可以开心的`npm run dev`启动项目
***
### 2.踩坑指北
#### 1.webpack-merge用法改变
webpack5使用解构的方式来配置，需要修改webpack.dev.conf.js和webpack.prod.conf.js






### 参考
[webpack Plugins](https://webpack.docschina.org/plugins/)
[从 v4 升级到 v5](https://webpack.docschina.org/migrate/5/)
[记录将项目中webpack4升级至webpack5一次成功尝试](https://www.mybj123.com/11258.html )
[老vue项目webpack3升级到webpack5全过程记录(一)](https://www.cnblogs.com/webhmy/p/14791194.html)
[学习 Webpack5 之路（优化篇）](https://www.cnblogs.com/o2team/p/15220107.html)






 