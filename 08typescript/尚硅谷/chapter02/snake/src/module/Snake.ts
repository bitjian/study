class Snake {
  // 获取父容器
  element: HTMLElement = document.getElementById("snake")!
  // 获取头部元素
  head: HTMLElement = document.querySelector("#snake>div")!
  // 获取身体元素
  bodies: HTMLCollection = this.element.getElementsByTagName("div")


  // 蛇头的坐标
  get X() {
    return this.head.offsetLeft
  }

  get Y() {
    return this.head.offsetTop
  }

  set X(val: number) {
    // 如果值没有改变就不进行样式修改了
    if (val === this.X) return
    if (val < 0 || val > 290) {
      throw new Error('蛇撞墙了！')
    }
    // 蛇不能反方向移动，怎么判断呢 ， 蛇头坐标和第二个坐标一样 则说明反向移动了
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === val) {
      if (val < (this.bodies[0] as HTMLElement).offsetLeft) {
        val = this.X + 10
      } else {
        val = this.X - 10
      }
    }

    // 移动身体
    this.moveBody()
    this.head.style.left = val + 'px'
    // 需要蛇移动后 判断是否有没有撞到身体
    this.checkHeadBody()
  }

  set Y(val: number) {
    if (val === this.Y) return
    if (val < 0 || val > 290) {
      throw new Error('蛇撞墙了！')
    }
    // 蛇不能反方向移动，怎么判断呢 ， 蛇头坐标和第二个坐标一样 则说明反向移动了
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === val) {
      if (val < (this.bodies[0] as HTMLElement).offsetTop) {
        val = this.Y + 10
      } else {
        val = this.Y - 10
      }
    }
    // 移动身体
    this.moveBody()
    this.head.style.top = val + 'px'
    // 需要蛇移动后 判断是否有没有撞到身体
    this.checkHeadBody()
  }

  // 蛇的身体会增加
  addBody() {
    // 如果要向一个元素中插入一段 HTML，而不是innerHTML替换它的内容，那么请使用 insertAdjacentHTML() 方法。
    this.element.insertAdjacentHTML("beforeend", "<div></div>")
  }

  // 处理身体移动
  moveBody() {
    // 怎么个移法： 遍历身体 让后面的身体移动到前面一个身体的位置
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前一个身体的坐标
      let frontBody = this.bodies[i - 1] as HTMLElement
      let X = frontBody.offsetLeft
      let Y = frontBody.offsetTop

      let currentBody = this.bodies[i] as HTMLElement
      currentBody.style.left = X + 'px'
      currentBody.style.top = Y + 'px'
    }
  }

  // 蛇的头不能撞身体
  checkHeadBody() {
    // 遍历身体，如果有坐标和头部一样 则说明撞身体了
    for(let i = 1; i< this.bodies.length -1; i++) {
      const currentBody = this.bodies[i] as HTMLElement
      if(currentBody.offsetLeft === this.X && currentBody.offsetTop === this.Y) {
        throw new Error("撞到身体啦！")
      }
    }
  }
}

export default Snake