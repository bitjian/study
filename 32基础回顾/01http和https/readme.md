# http1.x和http1.1区别
-  更多的错误标识
> 新增了24个错误代码，比如410 表示服务器某资源被永久删除
- 支持长连接
> 支持通过keep-alive，http每次请求都会重新建立tcp连接，https与服务器建立连接同保持一段时间，在一个tcp上可以进行多次请求
- 更多的缓存处理规则
> http 只支持 if-modify-since,expire，而https新增了 entity-tag, if-Unmodify-since,if-Match, if-No-Match
- host头处理
> Http认为一个服务器只绑定一个IP，请求没有带上hostname，但现在虚拟机技术流行起来，Https的每次请求会带上host，没有的话会报错
- 带宽优化及网络连接使用
> Http只能把请求资源一次请求全部带过来，而Https支持断点传输，通过请求头range头域可以传输一部分数据返回状态码206
# http和https区别
- 加密传输
> http请求，基于tcp之上,传输都是明文的，而http1.1基于SSL/TLS，SSL/TLS基于tcp之上，传输是进行加密的。
- https需要CA证书，一般都要钱
- https可以防止运营商劫持
- http端口号是80,https端口号是443,

# http2.0和http1.x
- 支持多路复用
> 1.*是每个请求都会建立一次连接
> 1.1是pipeling解决方式，每个请求串行进行的，前面的请求超时等待了，后面的都会阻塞
> 2.0 多个请求可以在一个连接上并行进行，某个请求耗时严重，不影响其他请求
- 头部压缩
> http1.x请求某个页面有100个请求，每个请求头带上cookie大小1kb，则100个请求也有100kb，而http2.0多个请求会对头部进行压缩，差量更新
- 二进制解析
> http1.x是基于文本解析的，而2.0是基于二进制0和1解析的
- 服务推送
> http1.x请求资源，每个资源都需要一个请求，2.0请求一个index.html会把关联的main.js一起推送过来