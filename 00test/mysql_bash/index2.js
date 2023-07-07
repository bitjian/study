const xlsx = require('node-xlsx')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, './cgb.xlsx')
const datasheet = xlsx.parse(filePath)
const knex = require('./db')
const dict = {}
const dict2 = {}
const codeList = datasheet[2].data
  .splice(1)
  .map((item) => ({
    shop_name: item[13],
    province: item[8],
    sys_name: item[12],
    shop_id: item[16],
  }))
const insertFunc = async () => {
  // await knex.insert(codeList).into('fulltext_test')
  return
}
const getShopCode = async (str1, str2) => {
  const sqlStr = `select * from fulltext_test where match(shop_name,province,sys_name) against(? in boolean mode) and sys_name like ?`
  const params = [`(${str2})`, `%${str1}%`]
  const data = await knex.raw(sqlStr,params)
  const shop_code = data[0][0] && data[0][0].shop_id
  const shop_name = data[0][0] && data[0][0].shop_name
  return [shop_code,shop_name]
}
insertFunc().then(async (res) => {
  const data2List = datasheet[3].data
  data2List[0].push(...['匹配编号','匹配店名'])
  const promiseList =  data2List.map(async (item, index) => {
    if (index === 0) return
    if (item[9]) {
      return (dict2[item[0]] = item[9])
    }
    const [shop_code, shop_name] = await getShopCode(item[1], item[0])
    if(!shop_code) return
    item[9] = shop_code
    item[12]= shop_code
    item[13] = shop_name
    dict2[item[1]+item[0]] = item[9]
  })
  await Promise.all(promiseList)
  console.log(dict2, Object.keys(dict2).length)
  // 将数据转换为Excel文件
  const buffer = xlsx.build([{ name: 'Sheet1', data: data2List }])

  // 将Excel文件保存到本地
  const localPath = path.join(__dirname, 'datadict.xlsx')
  fs.writeFile(localPath, buffer, (err) => {
    if (err) throw err
    console.log('Excel文件已生成')
  })
})
