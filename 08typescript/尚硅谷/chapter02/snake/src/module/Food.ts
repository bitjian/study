class Food {
  element : HTMLElement
  // 食物坐标的限制
  maxPosition:number

  constructor(maxPosition:number) {
    this.element = document.getElementById("food")!
    this.maxPosition = maxPosition
  }
  get offsetX() {
    return this.element.offsetLeft
  }
  get offsetY() {
    return this.element.offsetTop
  }
  /**
   * 改变食物的位置
   */
  changePosition() {
    // 让左边是10的倍数
    const left = Math.round(Math.random() * this.maxPosition) * 10
    const top = Math.round(Math.random() * this.maxPosition) * 10

    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }

}

export  default Food