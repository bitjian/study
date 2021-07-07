
const { logger } = require('./logger')
const data = [
  { 'id': 101, 'name': '语文', 'pid': -1 },
  { 'id': 102, 'name': '语文知识点1', 'pid': 101 },
  { 'id': 103, 'name': '语文知识点11', 'pid': 102 },
  { 'id': 104, 'name': '语文知识点2', 'pid': 101 },
  { 'id': 202, 'name': '数学知识点1', 'pid': 201 },
  { 'id': 201, 'name': '数学', 'pid': -1 },
  { 'id': 203, 'name': '数学知识点2', 'pid': 201 },
  { 'id': 204, 'name': '数学知识点3', 'pid': 201 },
  { 'id': 302, 'name': '英语知识点1', 'pid': 301 }
]

function toTree(data) {
  let res = []
  let obj = {}
  const len = data.length
  // 将data数据转换成 obj {id: data[i]}
  for (let i = 0; i < len; i++) {
    obj[data[i].id] = data[i]
  }
  // 再将有pid的数据 放入 id 为该数据pid 的children里
  for (let j = 0; j < len; j++) {
    let item = data[j]
    // 获取该元素的pid 去obj里找对应的 pid 对象
    const parentItem = obj[item.pid]
    // 如果找到了该元素的pid对象，说明这个元素有父对象
    if (parentItem) {
      if (!parentItem.children) {
        // 给父对象初始化 children
        parentItem.children = []
      }
      // 将该元素放入父对象的children里
      // console.log(item, parentItem)
      parentItem.children.push(item)
    } else {
      // 如果该元素没有pid，说明该元素没有子对象，自己就是原始对象，则放入返回结果里
      res.push(item)
    }
  }
  return res

}

const treeData = toTree(data)

logger.info(JSON.stringify(treeData))