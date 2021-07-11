const querystring = require("querystring")
const { logger } = require("../../00utils/logger")


// --------------1.querystring.parse() 将查询参数转换成对象 ------------

// const qs = "x=3&y=4"
// const parsed = querystring.parse(qs)
// logger.info(parsed)
// { x: '3', y: '4' }

// ----------2.querystring.stringfy() 将查询参数对象转换成 string---------
// const qo =  { x: '3', y: '4' }
// var parsed = querystring.stringify(qo)
// logger.info(parsed)
// x=3&y=4

// -----------3.escape/unescape 对url进行百分比编码和解码 百分比编码： “%” 后跟替换字符的ASCII的十六进制表示
const str =  'id=3&city=北京&url=https://www.baidu.com'
const escape = querystring.escape(str)
// logger.info(escape)
// id%3D3%26city%3D%E5%8C%97%E4%BA%AC%26url%3Dhttps%3A%2F%2Fwww.baidu.com
const unescaped = querystring.unescape(escape)
logger.info(unescaped)
// id=3&city=北京&url=https://www.baidu.com