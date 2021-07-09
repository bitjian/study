// url.parse 将url字符串解析成url对象
const {logger} = require('../../00utils/logger')
const url = require('url')
const urlString = 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110'
logger.info(url.parse(urlString))
logger.info(new URLSearchParams(urlString))