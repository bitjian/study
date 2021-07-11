// url.parse 将url字符串解析成url对象
const {logger} = require('../../00utils/logger')
const url = require('url')

// ***********1.url.parse 将 urlstring 解析成 url obj***************************
// const urlString = 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110'
// logger.info(url.parse(urlString))
// logger.info(new URLSearchParams(urlString))

// ***********2.url.format 将urlObj 解析成string********
// const urlObj = {
//   protocol: 'https:',
//   slashes: true,
//   auth: null,
//   host: 'www.baidu.com:443',
//   port: '443',
//   hostname: 'www.baidu.com',
//   hash: '#tag=110',
//   search: '?id=8&name=mouse',
//   query: 'id=8&name=mouse',
//   pathname: '/ad/index.html',
//   path: '/ad/index.html?id=8&name=mouse',
//   href: 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110'
// }
// logger.info(url.format(urlObj))
// // https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110

// ***********3.url.resolve url.resolve() 替换url最后一个/后面的path********
// const a = url.resolve('/one/two/three', 'four')
// logger.info("a url:"+a)
// const b =url.resolve('http://example.com/', '/one')
// logger.info("b url:"+b)
const c = url.resolve('http://example.com/one', 'two')
logger.info("c url:"+c)


