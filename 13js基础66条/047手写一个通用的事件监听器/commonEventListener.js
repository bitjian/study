const EventUtils = {
  // 添加事件
  /**
   * 
   * @param {*} element 元素
   * @param {*} type    事件类型
   * @param {*} handler 处理函数
   * addEventListener/attachEvent
   */
  addEvent(element, type, handler) {
    if(element.addEventListener) {
      element.addEventListener(type, handler)
    }else if(element.attachEvent) {
      element.attachEvent('on' + type, handler)
    }else {
      element['on' + type] = handler
    }
  },
  // 移除事件 removeEventListener/detachEvent
  removeEvent(element, type, handler) {
    if(element.removeEventListener) {
      element.removeEventListener(type, handler)
    }else if(element.detachEvent) {
      element.detachEvent('on' + type, handler)
    }else {
      element['on' + type] = null
    }
  },
  // 获取事件目标 event.target、event.srcElement
  getTarget(event) {
    return event.target || event.srcElement
  },
  // 获取event引用 event、window.event
  getEvent(event) {
    return event || window.event
  },
  // 阻止事件 stopPropagation cancelBubble
  stopPropagation(element) {
    if(element.stopPropagation) {
      element.stopPropagation()
    }else {
      element.cancelBubble = true
    }
  },
  // 取消事件的默认行为 preventDefault returnValue
  preventDefault(element){
    if(element.preventDefault) {
      element.preventDefault()
    }else {
      event.returnValue = false
    }
  }
  
}