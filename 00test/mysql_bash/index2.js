const xlsx = require('node-xlsx')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, './opdata.xlsx')
const datasheet = xlsx.parse(filePath)
const knex = require('./db')
const { includes } = require('lodash')
const dict = {}
const dict2 = {}
// 取原始字典数据存入数据库 shop_name，province，sys_name 为索引字段
const codeList = datasheet[4].data
  .splice(1)
  .map((item) => ({
    shop_name: `${item[2]?item[2].replace(/非连锁单体门店/g,''):''}${item[1]}`,
    province: item[4],
    sys_name: item[2],
    shop_id: item[0],
    shop_addr: item[3]
  }))
const insertFunc = async () => {
  // await knex.insert(codeList).into('fulltext_test')
  return
}
/**
 * 
 * @param {*} str1 系统名
 * @param {*} str2 门店名
 * @returns 
 */
const getShopCode = async (str1, str2) => {
  const sqlStr = `select * from fulltext_test where match(shop_name,province,sys_name) against(? in boolean mode) and sys_name like ?`
  const params = [`(${str2})`, `%${str1}%`]
  const data = await knex.raw(sqlStr,params)
  const shop_code = data[0][0] && data[0][0].shop_id
  const shop_name = data[0][0] && data[0][0].shop_name
  const shop_addr = data[0][0] && data[0][0].shop_addr
  return [shop_code,shop_name,shop_addr]
}
insertFunc().then(async (res) => {
  const data2List = datasheet[1].data
  // 新增的表头
  data2List[1].push(...['匹配店名'])
  const lastIndex = data2List[1].length - 1
  const promiseList =  data2List.map(async (item, index) => {
    if ([0,1].includes(index)) return
  
    // 获取匹配的编号，和门店名称
    const [shop_code, shop_name, shop_addr] = await getShopCode(item[1], item[12])
    if(!shop_code) return
      // 城市
      if (!item[10]) {
        item[10] = shop_addr
      }
      // 编号
      if(!item[11]) {
        item[11] = shop_code
      }
      if(!item[lastIndex]) {
        item[lastIndex] = shop_name
      }
    // item[12]= shop_code
    // item[13] = shop_name
    // dict2[item[1]+item[0]] = item[9]
  })
  await Promise.all(promiseList)
  // console.log(dict2, Object.keys(dict2).length)
  // 将数据转换为Excel文件
  const buffer = xlsx.build([{ name: 'Sheet1', data: data2List }])

  // 将Excel文件保存到本地
  const localPath = path.join(__dirname, 'datadict.xlsx')
  fs.writeFile(localPath, buffer, (err) => {
    if (err) throw err
    console.log('Excel文件已生成')
  })
})
// insertFunc()