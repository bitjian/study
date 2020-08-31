interface IArguments {
  [index: number]: number;
  length: number;
  callee: Function;
  name: string
}

interface Person {
  name: string;
  age?: number;
  [propName: string]: string | number | undefined;
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
};

export default {}