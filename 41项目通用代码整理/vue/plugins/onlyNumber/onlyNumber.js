export default {
  /**
   *
   * @param {*} el 指令所绑定的元素，用来直接操作DOM
   * @param {*} vDir 一个对象，有name:指令名， value: 指令绑定的值，oldValue: 指令绑定前的值，express:指令后面传入的表达式， arg:指令传入的参数
   * @param {*} vNode 虚拟DOM
   */
  inserted(el, vDir, vNode) {
    // vDir.value 有指令的参数
    let content
    // 设置输入框的值,触发input事件,改变v-model绑定的值
    const setVal = val => {
      if (vNode.componentInstance) {
        // 如果是自定义组件就触发自定义组件的input事件
        vNode.componentInstance.$emit('input', val)
      } else {
        // 如果是原生组件就触发原生组件的input事件
        el.value = val
        el.dispatchEvent(new Event('input'))
      }
    }
    // 按键按下=>只允许输入 数字/小数点/减号
    el.addEventListener('keypress', event => {
      const e = event || window.event
      const inputKey = String.fromCharCode(typeof e.charCode === 'number' ? e.charCode : e.keyCode)
      const re = /\d|\.|-/
      content = e.target.value
      // 定义方法,阻止输入
      function preventInput() {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }
      if (!re.test(inputKey) && !e.ctrlKey) {
        preventInput()
      } else if (content.indexOf('.') > 0 && inputKey === '.') {
        // 已有小数点,再次输入小数点
        preventInput()
      } else if (content.indexOf('.') > 0 && Number(vDir.value.precision) && content.substr(content.indexOf('.') + 1).length >= Number(vDir.value.precision)) {
        // 如果确定精确的位数，则不可以输入更多的小数
        // e.target.value = content.substr(0, content.length - 1) + inputKey
        preventInput()
      }
    })
    // 按键弹起=>并限制最大最小
    el.addEventListener('keyup', event => {
      const e = event || window.event
      const toZero = vDir.value ? !!vDir.value.toZero : false
      content = parseFloat(e.target.value)
      if (isNaN(content)) {
        e.target.value = toZero ? 0.00 : ''
        setVal(e.target.value)
        return false
      }
      let arg_max = ''
      let arg_min = ''
      if (vDir.value) {
        arg_max = parseFloat(vDir.value.max)
        arg_min = parseFloat(vDir.value.min)
      }
      if (arg_max !== undefined && content > arg_max) {
        setVal(arg_max)
        e.target.value = arg_max
      }
      if (arg_min !== undefined && content < arg_min) {
        setVal(arg_min)
        e.target.value = arg_min
      }
    })
    // 失去焦点=>保留指定位小数
    el.addEventListener('focusout', event => { // 此处会在 el-input 的 @change 后执行
      const e = event || window.event
      const toZero = vDir.value ? !!vDir.value.toZero : false
      content = parseFloat(e.target.value)
      if (isNaN(content)) {
        e.target.value = toZero ? 0.00 : ''
        setVal(e.target.value)
        return false
      }
      let arg_precision = 0// 默认保留至整数
      if (vDir.value.precision) {
        arg_precision = parseFloat(vDir.value.precision)
      }
      e.target.value = content.toFixed(arg_precision)
      setVal(e.target.value)
      // -- callback写法1
      // vNode.data.model.callback = ()=>{
      //     e.target.value = content.toFixed(arg_precision)
      // }
      // vNode.data.model.callback();
      // -- callback 写法2
      // vNode.data.model.callback(
      //     e.target.value = content.toFixed(arg_precision)
      // )
    })
  }
}
