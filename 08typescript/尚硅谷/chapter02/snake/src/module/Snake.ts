class Snake {
  // 获取父容器
  element:HTMLElement = document.getElementById("snake")!
  // 获取头部元素
  head:HTMLElement = document.querySelector("#snake>div")!
  // 获取身体元素
  bodies:HTMLCollection = this.element.getElementsByTagName("div")
  

  // 蛇头的坐标
  get X() {
    return this.head.offsetLeft
  }

  get Y() {
    return this.head.offsetTop
  }

  set X(val:number) {
    // 如果值没有改变就不进行样式修改了
    if(val === this.X) return
    if(val <0 || val > 290) {
      throw new Error('蛇撞墙了！')
    }
    this.head.style.left = val + 'px'
  }

  set Y(val:number) {
    if(val === this.Y) return
    if(val <0 || val > 290) {
      throw new Error('蛇撞墙了！')
    }
    this.head.style.top = val + 'px'
  }

  // 蛇的身体会增加
  addBody() {
    // 如果要向一个元素中插入一段 HTML，而不是innerHTML替换它的内容，那么请使用 insertAdjacentHTML() 方法。
    this.element.insertAdjacentHTML("beforeend","<div></div>")
  }
}

export default Snake