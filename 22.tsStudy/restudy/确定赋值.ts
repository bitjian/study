console.log(initialize.toString());

let x!: number;
initialize();
console.log(2 * x); // Ok

function initialize() {
  x = 10;
}