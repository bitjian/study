let promiseList = new Array(100).fill(1).map(async (item, index) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(index)
    }, Math.random() * 1000);
  })
})
const asyncFun = (task, promiseArray) => {
  return task.then((res) => {
    console.log('lengthBefore:'+promiseArray.length+" res:"+res)
    if (promiseArray.length > 0) {
      const taskCopy = promiseArray.shift()
      console.log('lengthAfter:'+promiseArray.length)
      return asyncFun(taskCopy, promiseArray);
    }
    // promiseArray = [];
    return res;


  });
};
const promisePage = (promiseArray, limit = 10) => {
  // let promiseArray = [];
  // promiseArray = promiseList;
  const asyncPool = [];
  // 初始化第一批任务列表 TODO: 判断jobList长度是否大于LIMIT
  for (let i = 0; i < limit; i++) {
    const task = promiseArray.shift();
    console.log(task);
    asyncPool.push(asyncFun(task, promiseArray));
  }
  return asyncPool;
};


// console.log(promiseList);

let pool = promisePage(promiseList)
console.log(pool);
Promise.all(pool).then(res => {
  console.log(res);
})