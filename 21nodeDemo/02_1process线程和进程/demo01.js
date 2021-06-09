const spawn = require('child_process').spawn;
const child = spawn('dir') // cwd 指定子进程的工作目录，默认当前目录

child.stdout.pipe(process.stdout);
console.log(process.pid); // 主进程id3243 子进程3244