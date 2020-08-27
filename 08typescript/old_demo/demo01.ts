// ---------1.类型注解--------------------------
// function greeter(person: string) {
//   return "Hello," + person;
// }
// let user = 123;

// document.body.innerHTML = greeter(user);
// -----------------类型“number”的参数不能赋给类型“string”的参数-----------

// --------------------2.接口-------------------------

// interface Person {
//   firstName: string,
//   lastName: string,
// }

// let user = {firstName: 123, lastName: 'zhang'}

// function greeter(person: Person) {
//   return "hello,"+person.lastName + "" + person.firstName;
// }

// document.body.innerHTML = greeter(user);
// 类型“{ firstName: number; lastName: string; }”的参数不能赋给类型“Person”的参数。
// 类型“number”的参数不能赋给类型“string”的参数 

// ----------------------3.类-----------------------

class Student {
  fullname: string;
  constructor(public firstName, public middleInitial, public lastName) {
    this.fullname = firstName + ' ' + middleInitial + ' '+ lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello" + person.firstName + '' + person.lastName;
}

let user = new Student('zijian', 'xiao', 'zhang')

document.body.innerHTML = greeter(user)