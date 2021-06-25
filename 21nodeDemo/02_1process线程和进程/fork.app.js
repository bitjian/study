const http = require('http');
const fork = require('child_process').fork;

const server = http.createServer((req, res) => {
  if (req.url == '/compute') {
    console.log('/compute start')
    // 开启多个进程
    const compute = fork('./fork_compute.js');
    const compute2 = fork('./fork_compute.js');
    compute.send('开启一个新的子进程');
    compute2.send('开启一个新的子进程');

    // 当一个子进程使用 process.send() 发送消息时会触发 'message' 事件
    compute.on('message', sum => {
      res.end(`Sum is ${sum}`);
      compute.kill();
    });
    // 当一个子进程使用 process.send() 发送消息时会触发 'message' 事件
    compute2.on('message', sum => {
      res.end(`Sum is ${sum}`);
      compute2.kill();
    });

    // 子进程监听到一些错误消息退出
    compute.on('close', (code, signal) => {
      console.log(`收到close事件，子进程收到信号 ${signal} 而终止，退出码 ${code}`);
      compute.kill();
    })
    compute2.on('close', (code, signal) => {
      console.log(`收到close事件，子进程收到信号 ${signal} 而终止，退出码 ${code}`);
      compute2.kill();
    })
    console.log('/compute end' + process.pid)
  } else {
    res.end(`ok`);
  }
});

server.listen(3008, '127.0.0.1', () => {
  console.log(`server started at http://127.0.0.1:${3008}`);
});