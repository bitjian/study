/**
 * 字符串字面量类型
 * 通过类型别名 声明一个 字符串字面量联合类型
 * 来约束变量只能取多个字面量中的一个
 */
type EventNames = 'click' | 'scroll' | 'mousemove'
function handleEvent(ele:Element, event: EventNames) {
  // TODO do something
}
handleEvent(document.getElementById('main'), 'scroll')  // 没问题
// handleEvent(document.getElementById('world'), 'dblclick'); // 报错，只能取三个字符串中的一个

export {}