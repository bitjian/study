"use strict";
// 装饰者设计模式：在软件开发过程中，有时想用一些现存的组件。这些组件可能只是完成了一些核心功能。但在不改变其结构的情况下，可以动态地扩展其功能。所有这些都可以釆用装饰器模式来实现。
// 装饰器（Decorator）模式的定义：指在不改变现有对象结构的情况下，动态地给该对象增加一些职责（即增加其额外功能）的模式，它属于对象结构型模式。
// 我：男，24岁，178cm
// 比如 上班的我：敲代码，改BUG，木头人
// 下班的我：会做饭，弹尤克里里，健身
// 这就可以用装饰者来装饰一下我
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var OriginJian = /** @class */ (function () {
    function OriginJian() {
    }
    OriginJian.prototype.display = function () {
        console.log('男，24岁，178cm');
    };
    return OriginJian;
}());
// 装饰器
var Decorator = /** @class */ (function () {
    function Decorator(jian) {
        this.jian = jian;
    }
    Decorator.prototype.display = function () {
        this.jian.display();
    };
    return Decorator;
}());
// 在家的我
var HomeJian = /** @class */ (function (_super) {
    __extends(HomeJian, _super);
    function HomeJian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomeJian.prototype.display = function () {
        console.log('在家里的时候');
        _super.prototype.display.call(this);
        this.keepFit();
        this.cooking();
        this.ukulele();
    };
    // 健身
    HomeJian.prototype.keepFit = function () {
        console.log("晚上8点跑步");
    };
    HomeJian.prototype.cooking = function () {
        console.log("双休煲鸡汤");
    };
    HomeJian.prototype.ukulele = function () {
        console.log("弹尤克里里");
    };
    return HomeJian;
}(Decorator));
// 工作的我
var BitJian = /** @class */ (function (_super) {
    __extends(BitJian, _super);
    function BitJian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BitJian.prototype.display = function () {
        console.log('工作的时候');
        _super.prototype.display.call(this);
        this.fixBug();
        this.coding();
        this.thinking();
    };
    // 健身
    BitJian.prototype.fixBug = function () {
        console.log("改BUG");
    };
    BitJian.prototype.coding = function () {
        console.log("写代码");
    };
    BitJian.prototype.thinking = function () {
        console.log("思考人生");
    };
    return BitJian;
}(Decorator));
(function mainFunc() {
    var jian = new OriginJian();
    jian.display();
    var homeJian = new HomeJian(jian);
    homeJian.display();
    var bitJian = new BitJian(jian);
    bitJian.display();
})();
