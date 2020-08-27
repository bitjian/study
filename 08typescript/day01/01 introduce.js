// 首先你需要知道，编程开发中我们有一个共识：错误出现的越早越好
// 能在写代码的时候发现错误，就不要在代码编译时再发现（IDE的优势就是在代码编写过程中帮助我们发现错误）。
// 能在代码编译期间发现错误，就不要在代码运行期间再发现（类型检测就可以很好的帮助我们做到这一点）。
// 能在开发阶段发现错误，就不要在测试期间发现错误，能在测试期间发现错误，就不要在上线后发现错误。
// typescript定义
// typescript是JavaScript的超集，能编译成更干净、完整的JavaScript
// 怎么个超集（穿了什么装备）
// 拥有JavaScript所拥有的特性，并紧随ecma的标准，所以支持ES6,6,7,8...bundleRenderer.renderToStream
// typescript在编译时会被编译成JavaScript，不用担心兼容性问题，也不需要借助Babel工具（始于javascript归于javascript）
// 增加了类型约束，还扩展了一些语法如枚举类型（Enum)、元组类型（Tuple)等(适合构建大型项目，不容易出错)
// typescript在实现新特性的同时，总是保持和ES标准的同步甚至领先（拥有先进的javascript特性）
// 就是穿了一身神装的javascript
// 常用功能： 静态类型检查。