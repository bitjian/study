// bind用法
// 1.改变this的指向
// bind()的另一个简单用法就是使一个函数拥有预设的初始参数。这些参数会作为bind()的第二个参数跟在this后面，之后它们会插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。
function f(y, z) {
  return this.x + y + z
}

// var m = f.bind({x:1}, 2)

var m = function() {
  
}