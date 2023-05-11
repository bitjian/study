
// ========test1========
// const main = async () => {
//   const a = () => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log(2)
//         resolve(2)
//       }, 2000);
//     })
//   }
//   await a()
//   console.log(1)
// }
// main()

// ========test2========

const arr = [1,3,5,7,9,11,13] 

const getLog = async() => {
  setTimeout(() => {
    throw new Error('time out')
  }, 10000);
  for(let item of arr) {
    new Promise((resolve, reject)=> {
      setTimeout(() => {
        console.log(item)
        resolve(item)
      }, item * 1000);
    })
  }
}
getLog()