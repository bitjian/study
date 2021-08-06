// 桥接模式：比如一个电脑，有很多分类：
// 按芯片可以分为 AMD 和 core
// 按屏幕大小可以分为 16寸 和 15.6寸
// 按重量可以分为 轻薄本和游戏本
// 可以用聚合和组合的方式代替继承来实现这些分类
// 抽象的芯片
interface Chip {
  getChip(): string
}
// 具体的芯片
class AMDChip implements Chip {
  getChip() {
    return 'AMD芯片'
  }
}

class CoreChip implements Chip {
  getChip() {
    return 'Intel Core 芯片'
  }
}

interface ScreenSize {
  getSize(): string
}

class MaxScreen implements ScreenSize {
  getSize() {
    return '16寸显示屏'
  }
}

class NormalScreen implements ScreenSize {
  getSize() {
    return '15.5寸显示屏'
  }
}

abstract class Computer {
  protected chip:Chip
  protected screenSize:ScreenSize
  // 不要通过构造函数，初始化芯片和屏幕 不然就不能随意更改了
  constructor() { }
  setChip(chip:Chip) {
    this.chip = chip
  }
  setSize(screenSize:ScreenSize) {
    this.screenSize = screenSize
  }
  abstract getName()
}

class GameComputer extends Computer{
  constructor() {
    super()
  }
  getName() {
    console.log(`这是一个${this.chip.getChip()}，${this.screenSize.getSize()}的游戏本`);
  }
}

(function mainFunc() {
  const amdChip:Chip = new AMDChip()
  const screenSize:ScreenSize = new MaxScreen()
  const gameComputer:Computer = new GameComputer()
  gameComputer.setChip(amdChip)
  gameComputer.setSize(screenSize)
  gameComputer.getName()
  const coreChip:Chip = new CoreChip()
  gameComputer.setChip(coreChip)
  gameComputer.getName()
})()

export {}
