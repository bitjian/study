class ScorePanel {
  // 分数
  scoreEle : HTMLElement
  // 级别
  levelEle : HTMLElement
  // 分数和级别
  score: number = 0
  level: number = 1
  // 设置最高级别
  maxLevel: number
  // 设置每多少分数升级
  upNumber:number

  constructor(maxLevel:number = 10, upNumber:number = 10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!

    this.maxLevel = maxLevel
    this.upNumber = upNumber
  }
  scoreUp() {
    this.scoreEle.innerHTML = ++this.score + ''
    // 没多少分数升级
    if(this.score % this.upNumber === 0) {
      this.levelUp()
    }
  }
  levelUp() {
    if(this.level < this.maxLevel ) {
      this.levelEle.innerHTML = ++this.level + ''
    }
  }
}

export default ScorePanel