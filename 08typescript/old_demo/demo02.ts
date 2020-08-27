enum E {
  X, Y, Z
}
function f(obj: { X: number }) {
  console.log(obj.X);
  
  return obj.X;
}

// Works, since 'E' has a property named 'X' which is a number.
f(E);