// 设计模式SOLID
// 单一职责
// 开放封闭
// 里式替换
// 依赖注入
// 接口反转
// 给不同的职责保存信息
// 程序员： 开发， 学习， 摸鱼
// 项目经理： 沟通，分配，规划
// 产品经理：沟通，原型，需求
// 如果用字面量的模式需要分别创建三个不同的字面量
// 用工厂模式，创建一个工厂对创建对象过程进行封装，实际使用过程只用去使用工厂
class User {
  constructor(name, age, career, workes,) {
    this.name = name
    this.age = age
    this.career = career
    this.workes = workes
  }
}

function Factor(name, age, career) {
  let workes = []
  switch (career) {
    case 'coder':
      workes = ['开发', '学习', '摸鱼']
      break
    case 'product manager':
      workes = ['沟通', '需求', '原型']
      break
    case 'project manager':
      workes = ['沟通', '分配', '规划']
      break
    default:
      break
  }
  return new User(name, age,career, workes)
}