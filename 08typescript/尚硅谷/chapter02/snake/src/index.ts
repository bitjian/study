import './style/index.less'
import {Food} from './module/Food'
import {ScorePanel} from './module/ScorePanel'

const MAX_POSITION = 29
const MAX_LEVEL = 10
const UP_NUMBER = 10

const food = new Food(MAX_POSITION)
const scorePanel = new ScorePanel(MAX_LEVEL,UP_NUMBER)

let foodTiming = setInterval(()=> {
  food.changePosition()
  console.log(food.offsetX,food.offsetY)
},1000)

let scoreTiming = setInterval(()=> {
  scorePanel.scoreUp()
  console.log(scorePanel.score,scorePanel.level)
  if(scorePanel.score > 21) {
    clearInterval(foodTiming)
    clearInterval(scoreTiming)
  }
},500)
console.log(123);

