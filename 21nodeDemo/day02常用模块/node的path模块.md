### NODE的path模块 常见属性和api
#### __dirname,__filename区别
 > __dirname 是返回当前目录的绝对路径  
 > 
 > __filename 是返回当前文件的绝对路径  

#### path.resolve和path.join区别
  > path.join(path1，path2，path3…) 是将路径片段连接起来形成路径
  >> path.join(’/img’, ‘book’, ‘net/abc’, ‘inter’, ‘…’); 
  >> // 返回 /img/book/net/abc   ->> 拼接的路径是 /img/book/net/abc/inter 加上... 就返回到上一级目录了

  > path.resolve([from…],to) 是将路径/路径片段解析为绝对路径
  >> 例子：我当前的工作路径为/workspace/demo
  >> 
```
  console.log(path.resolve(‘img/books’, ‘/net’)) // returns ‘/net’
  console.log(path.resolve(‘img/books’, ‘./net’)) 
  // returns ‘/workspace/demo/img/books/net’
  console.log(path.resolve(’/img/books’, ‘./net’)) // returns ‘/img/books/net’
  console.log(path.resolve(’/img/books’, ‘net’)) // returns ‘/img/books/net’
  console.log(path.resolve(’/img/books’, ‘…/net’)) // returns ‘/img/net’
  console.log(path.resolve(‘src’,’/img/books’, ‘…/net’)) // returns ‘/img/net’
  console.log(path.resolve(‘src’,’./img/books’, ‘…/net’)) 
  // returns ‘/workspace/demo/src/img/net’
  console.log(path.resolve(‘src’,‘img/books’, ‘…/net’))
  // returns ‘/workspace/demo/src/img/net’
  
```
>> 总结一下：从后向前，若字符以 / 开头，不会拼接到前面的路径；若以 …/ 开头，拼接前面的路径，但是不含前面一节的最后一层路径；若以 ./ 开头 或者没有符号 则拼接前面路径；

### 总结
> path.join和path.resolve区别：
>> join是把各个path片段连接在一起， resolve把‘／'当成根目录
>>> path.join(’/a’, ‘/b’) // Outputs ‘/a/b’
>>> path.resolve(’/a’, ‘/b’) // Outputs ‘/b’
> 
>> join直接拼接字段，resolve解析路径并返回
>>> path.join(“a”, “b1”, “…”, “b2”)
>>> console打印会得到"a/b2"
>>> path.resolve(“a”, “b1”, “…”, “b2”)
>>> console打印得到"/home/myself/node/a/b2"
