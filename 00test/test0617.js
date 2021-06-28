function test(a, b){
  // a  = 101
 // b = 100
console.log(b);
return {
  test: function(c) {
      // c = 102
     // a = 101
    return test(c,a);
  }
}
}

var a = test(100);a.test(101);a.test(102);