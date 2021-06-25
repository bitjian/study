Function.prototype.myCall = function(context) {
  if(typeof this !== 'function') {
    return console.error('this is not a function')
  }
  const arg = [...arguments].slice(1)
  context = context || window
  context.fn = this
  const result = context.fn(arg)
  delete context.fn
  return result 
}

function consoleLog() {
  console.log(this.a)
}
let A = {}
A.myCall({a:100},'')