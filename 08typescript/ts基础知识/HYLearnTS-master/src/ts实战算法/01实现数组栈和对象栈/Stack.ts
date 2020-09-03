/**
 *  栈是一种后进先出LIFO的数据结构，需要获取刚放进去的数据，那栈肯定是首选
 */

/**
 * 数组实现栈
 * 1.实现思路,栈有哪些功能
 * 入栈(push)
 * 出栈(pop)
 * 获取栈顶元素(peek)
 * 判断是否为空(isEmpty)
 * 获取栈内元素(getElement)
 * 获取栈大小(size)
 * 清空栈(clear)
 */
class Stack {
  private item:any[]
  constructor() {
    this.item = []
  }
  // 压栈
  push(ele: any): void {
    this.item.push(ele)
  }
  // 出栈
  pop(): any {
    return this.item.pop()
  }
  // 获取栈顶元素
  peek(): any {
    return this.item[this.item.length -1]
  }
  // 判断数组是否为空
  isEmpty(): boolean {
    console.log('isEmpty',this.item.length === 0)
    return this.item.length === 0
  }
  // 获取栈内元素
  getElements(): string {
    console.log('getElements', this.item.toString())
    return this.item.toString()
  }
  // 获取栈大小
  size(): number {
    console.log('size', this.item.length)
    return this.item.length
  }
  // 清空栈
  clear(): void {
    this.item = []
  }
}
// 进行测试
const stack:Stack = new Stack()
// 入栈
stack.push('zzj')
stack.push('sjj')
// 获取栈大小
stack.size()
// 获取栈内元素
stack.getElements()
// 判断是否为空
stack.isEmpty()
// 出栈
const popEle:any = stack.pop()
console.log('pop', popEle)
const peekEle: any = stack.peek()
console.log('peekEle', peekEle)
stack.getElements()
stack.clear()
stack.isEmpty()
export default {}