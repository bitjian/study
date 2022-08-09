const obj3: { [key: string]: any; color?: string; width?: number } = {
  colour: 'blue',
  width: 666,
}; // string index signature

const obj4: {} =  {
  colour: 'blue',
  width: 666,
  a:1,
  b:2
}; // has no properties

const obj5: Object = {
  colour: 'blue',
  width: 666,
  a:1,
  b:2
}; // global Object

const obj6: { color?: string; colour?: string; width?: number;} = {
  colour: 'blue',
  width: 666,
}; 



interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: "blue",
    area: 666
  };
}

// (1) fresh object literal type
const obj: SquareConfig = { colour: "red", width: 888 }; // Error

// (2) fresh object literal type
let mySquare = createSquare({ colour: "red", width: 888 }); // Error

// (3) Widened form：{ colour: string, width: number }
const obj2 = { colour: "red", width: 888 };
createSquare(obj2); // Ok

// (4) Type assertion
createSquare({ colour: "red", width: 888 } as SquareConfig); // Ok


class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}

// 错误：字符串类型的索引的类型Dog不是数字类型索引的类型Animal的子类型
interface NotOkay {
  [x: number]: Animal;
  [y: string]: Dog;
}

interface Okay {
  [y: string]: Animal;
  [x: number]: Dog;
}