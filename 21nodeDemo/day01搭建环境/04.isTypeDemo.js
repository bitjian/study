// 判断对象的的类型
var isType = function(type) {
    return function(obj) {
        return toString.call(obj) == '[object '+ type + ']';
    };
}

var isString = isType('String');
var isFunction = isType('Function');
console.log(isString('aaa'));
console.log(isFunction({}));