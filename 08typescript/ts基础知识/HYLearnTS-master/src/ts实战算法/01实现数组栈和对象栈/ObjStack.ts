/**
 *  使用对象实现栈
 * 在使用数组时，大部分方法的时间复杂度都为O(n),我们需要迭代整个数组直至找到目标元素，
 * 在最坏的情况下我们需要迭代数组的每一个位置。数组是元素的一个有序集合，为了保证元素排列有序，它会占用更多的内存空间。
 * 如果我们可以直接获取元素，占用更少的内存空间，并且仍然保证所有元素都按照我们的需要进行排列，就属于最优解决方案了。
 */
// 定义一个栈对象结构
interface StackObj {
  [propName: number]: any   // 添加一个任意属性，属性签名为number类型， 属性值为 any
}

class Stack {
  // 声明一个存放栈数据的变量
  private item: StackObj;
  // 什么一个记录栈大小的变量
  private count: number;
  constructor() {
    this.item = {}
    this.count = 0
  }
  // 压栈
  push(ele: any): void {
    // 将元素放入对象索引的最后一个
    this.item[this.count] = ele
    // 索引加一
    this.count++
  }
  // 出栈
  pop(): any {
    // 如果栈内元素为空，则返回undefined
    if (this.isEmpty()) return undefined
    // 栈大小减一
    this.count--
    // 获取最后一个元素
    const result = this.item[this.count]
    // 删除最后一个索引（最大）
    delete this.item[this.count]
    // 返回结果
    return result
  }
  // 获取栈顶元素
  peek(): any {
    // 如果栈内元素为空，则返回undefined
    if (this.isEmpty()) return undefined
    return this.item[this.count - 1]
  }
  // 判断数组是否为空
  isEmpty(): boolean {
    console.log('isEmpty', this.count === 0)
    return this.count === 0
  }
  // 获取栈内元素
  getElements(): string {
    if (this.isEmpty()) return ""
    // 通过遍历获取
    let str = this.item[0].toString()
    for (let i = 1; i < this.count; i++) {
      str = `${str},${this.item[i].toString()}`
    }
    // 通过Object.values获取
    const elements = Object.values(this.item)
    console.log('getElements', elements.toString())
    return str || elements.toString()
  }
  // 获取栈大小
  size(): number {
    console.log('size', this.count)
    return this.count
  }
  // 清空栈
  clear(): void {
    // 将属性还原
    this.count = 0
    this.item = {}
  }
}

// 进行测试
const stack: Stack = new Stack()
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
const popEle: any = stack.pop()
console.log('pop', popEle)
const peekEle: any = stack.peek()
console.log('peekEle', peekEle)
stack.getElements()
stack.clear()
stack.isEmpty()

export { }