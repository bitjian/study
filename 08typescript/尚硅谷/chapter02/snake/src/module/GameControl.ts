import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'

const MAX_POSITION = 29
const MAX_LEVEL = 10
const UP_NUMBER = 2

class GameControl {
  food // 食物实例
  scorePanel // 计分板实例
  snake // 蛇的实例
  direction: string = 'ArrowRight' // 移动方向 
  isLive: boolean = true // 是否存活
  constructor() {
    this.food = new Food(MAX_POSITION)
    this.scorePanel = new ScorePanel(MAX_LEVEL, UP_NUMBER)
    this.snake = new Snake()
    this.init()
  }

  // 游戏初始化
  init() {
    // 监听键盘事件
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    this.run()
  }
  handleKeyDown(event: KeyboardEvent) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 's'].includes(event.key)) {
      this.direction = event.key
      console.log(event.key)
      if(event.key === 's' && this.isLive === false) {
        this.isLive = true
        this.run()
      }
    }

  }

  run() {
    let x: number = this.snake.X
    let y: number = this.snake.Y
    switch (this.direction) {
      case 'ArrowLeft':
      case 'Left':
        x -= 10
        break
      case 'ArrowRight':
      case 'Right':
        x += 10
        break
      case 'ArrowUp':
      case 'Up':
        y -= 10
        break
      case 'ArrowDown':
      case 'Down':
        y += 10
        break
    }
    // 检查有没有吃到食物
    this.checkEat(x,y)
    try {
      this.snake.X = x
      this.snake.Y = y
    } catch (e) {
      alert(e.message + ' GAME OVER!')
      this.isLive = false
    }
    // 存活状态下才移动
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  checkEat(x:number,y:number) {
    if(x === this.food.offsetX && y === this.food.offsetY) {
      // 改变食物的位置
      this.food.changePosition()
      // 给蛇增加身体
      this.snake.addBody()
      // 增加分数
      this.scorePanel.scoreUp()
    }
  }
}

export default GameControl