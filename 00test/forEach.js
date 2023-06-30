const promiseFunction = async (x) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Promise Resolved');
      resolve();
    }, x * 1000);
  });
};

const myArray = [1, 2, 3];

// 在 forEach 的回调函数中使用 async 和 await
const test1 = async () => {
  await myArray.forEach(async x => {
    console.log('Starting:', x);
    await promiseFunction(x);
    console.log('Finished:', x);
  });
  console.log('Done');
};

// 在 forEach 前使用 await
const test2 = async () => {
  for (const x of myArray) {
    console.log('Starting:', x);
    await promiseFunction(x);
    console.log('Finished:', x);
  }
  console.log('Done');
};

test1();
// test2();