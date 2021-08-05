console.log(initialize.toString());
var x;
initialize();
console.log(2 * x); // Ok
function initialize() {
    x = 10;
}
