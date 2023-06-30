const parseString = require('xml2js').parseString

const parseProcess = (result, processInfo) => {
  if( result.Config && result.Config.WhiteFilter &&  result.Config.WhiteFilter[0] && result.Config.WhiteFilter[0].Process) {
    const allProcess = result.Config.WhiteFilter[0].Process[0].Item || []
    const otherProcess = allProcess.find(item => item.$ && item.$.type === 'Other') || {}
    const innerTextArr = (otherProcess._ || '').split(";")
    const innerTextArrB = (otherProcess._ || '').split(";")
    processInfo.forEach(key => {
      if(!innerTextArrB.includes(key)) {
        innerTextArr.push(key)
      }
    })
    otherProcess._  = innerTextArr.join(";")
    return
  }
}

const parseClass = (result, classInfo) => {
  if( result.Config && result.Config.WhiteFilter &&  result.Config.WhiteFilter[0] && result.Config.WhiteFilter[0].Class) {
    const allClass = result.Config.WhiteFilter[0].Class[0].Item || []
    const otherClass = allClass.find(item => item.$ && item.$.type === 'Other') || {}
    const innerTextArr = (otherClass._ || '').split(";")
    const innerTextArrB = (otherClass._ || '').split(";")
    classInfo.forEach(key => {
      if(!innerTextArrB.includes(key)) {
        innerTextArr.push(key)
      }
    })
    otherClass._  = innerTextArr.join(";")
    return
  }
}
const parseCombin = (result, combinInfo) => {
  if( result.Config && result.Config.WhiteFilter &&  result.Config.WhiteFilter[0] && result.Config.WhiteFilter[0].Combination) {
    const allCombin = result.Config.WhiteFilter[0].Combination[0].Item || []
    let newCombinList = []
    combinInfo.forEach(combin => {
      const flag = allCombin.every((item,index) => {
        const itemKeys = Object.keys(item.$ || {})
        const combinKeys = Object.keys(combin)
        // 判断键长是否都不一样
        if(itemKeys.length !== combinKeys.length) return true
        // 判断属性值是否都不一样
        return !itemKeys.every(key => {
          if(item.$[key] === combin[key]) return true
          return false
        })
      })
      if(flag) {
        newCombinList.push({$:combin})
      }
    })
    result.Config.WhiteFilter[0].Combination[0].Item.push(...newCombinList) 
    return
  }
}
parseString(xml, function (err, result) {
  if(err) {
    return err
  }
  // const allProcess = result.Config.WhiteFilter[0].Process[0].Item || []
  // console.log(allProcess)
  // const otherProcess = allProcess.find(item => item.$ && item.$.type === 'Other') || {}
  // 获取Other类型的Process
  parseProcess(result,[1,2,3])

  // const allClass = result.Config.WhiteFilter[0].Class[0].Item || []
  // console.log(allProcess)
  // const otherClass = allClass.find(item => item.$ && item.$.type === 'Other') || {}
  // console.log(otherClass)
  // 获取Other类型的Class
  parseClass(result,[1,2,3])
  // console.log(otherClass)

  parseCombin(result,[])
});
