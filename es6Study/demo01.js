// a = 10;
// obj = {
//   a: 1,
//   f:() => {
//     console.log('1', this.a, this)
//     const g = () => {
//       console.log('2', this.a, this)
//     }
//     g()
//   }
// }

// obj.f() 

a = 10;
obj = {
  a: 1,
  f:function() {
    console.log('1', this.a, this)
    setTimeout(() => {console.log(this.a, this);
    })
  }
}

// function af() {
//   console.log(1,this);
//   function bf() {
//     console.log(2,this);
//   }
//   bf()

// }
// af()
const o = obj.f() 
console.log(o);
