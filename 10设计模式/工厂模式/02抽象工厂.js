// 抽象工程，就是把每个功能抽象出来形成一个单独的板块
// 假如有一个手机工厂，要生产手机，
// 手机又分为安卓手机，和苹果手机，使用的芯片包括高通，三星，麒麟
// 创建一个手机工厂，可以组合任何种类的手机（抽象）
class MobileFactory {
  createOS() {
    throw new Error('抽象方法，不允许直接调用')
  }
  createChip() {
    throw new Error('抽象方法，不允许直接调用')
  }
}

// 创建一个抽象的系统工厂,分别有苹果，安卓，鸿蒙，(什么抽象工厂，不就是抽象类么...)
class OSFactory {
  createOSType() {
    throw new Error('抽象方法，不允许直接调用')
  }
}

class IOS extends OSFactory {
  createOSType() {
    console.log('您使用IOS系统')
  }
}

class Android extends OSFactory {
  createOSType() {
    console.log('您使用安卓系统')
  }
}

class Harmony extends OSFactory {
  createOSType() {
    console.log('您使用的是鸿蒙系统')
  }
}

// 创建一个抽象的芯片工厂,分别有高通，麒麟，三星，(什么抽象工程，不就是基础接口么...)
class ChipFactory {
  createChipType() {
    throw new Error('抽象方法，不允许直接调用')
  }
}

class GT extends ChipFactory {
  createChipType() {
    console.log('您使用的是GT芯片')
  }
}

class QL extends ChipFactory {
  createChipType() {
    console.log('您使用的是QL芯片')
  }
}

class SX extends ChipFactory {
  createChipType() {
    console.log('您使用的是SX芯片')
  }
}

// 接下来就可以制造手机了
class Huawei {
  createOS() {
    return new Harmony()
  }
  createChip() {
    return new QL()
  }
}

const huawei = new Huawei()
const huaweiOS = huawei.createOS()
huaweiOS.createOSType()
const huaweiChip = huawei.createChip()
huaweiChip.createChipType()