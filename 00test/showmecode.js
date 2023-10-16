const getPriceForTag = (tag, price) => {
  if (tag === 'old') {
    console.log(`老用户的价格:${price * 0.9}`)
    return `老用户的价格:${price * 0.9}`
  }
  if (tag === 'new') {
    console.log(`新用户的价格:${price * 0.7}`)
    return `老用户的价格:${price * 0.7}`
  }
  if (tag === 'vip') {
    console.log(`会员用户的价格:${price * 0.5}`)
    return `会员用户的价格:${price * 0.5}`
  }
}
getPriceForTag('old', 1000)
const PriceForTagObj = {
  old: {tagInfo: '老用户的价格:', discount: 0.9},
  new: {tagInfo: '新用户的价格:', discount: 0.7},
  vip: {tagInfo: '会员用户的价格:', discount: 0.5},
}
const getPriceInfo = (tag,price) => {
  const {tagInfo, discount} = PriceForTagObj[tag]
  console.log(`${tagInfo}${price*discount}`)
  return `${tagInfo}${price*discount}`
}
getPriceInfo('old', 1000)