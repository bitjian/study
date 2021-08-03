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
// 装修的客厅
var Parlour = /** @class */ (function () {
    function Parlour() {
        this.wall = '';
        this.TV = '';
        this.sofa = '';
    }
    Parlour.prototype.setWall = function (wall) {
        this.wall = wall;
    };
    Parlour.prototype.setTV = function (tv) {
        this.TV = tv;
    };
    Parlour.prototype.setSofa = function (sofa) {
        this.sofa = sofa;
    };
    Parlour.prototype.show = function () {
        console.log("wall:" + this.wall + ",TV:" + this.TV + ",sofa:" + this.sofa);
    };
    return Parlour;
}());
// 抽象的装修师
var Decorator = /** @class */ (function () {
    function Decorator() {
        this.product = new Parlour();
    }
    Decorator.prototype.getResult = function () {
        return this.product;
    };
    return Decorator;
}());
// 具体的装修工
var MiDecorator = /** @class */ (function (_super) {
    __extends(MiDecorator, _super);
    function MiDecorator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MiDecorator.prototype.buildWall = function () {
        this.product.setWall('小米智能墙');
    };
    MiDecorator.prototype.buildSofa = function () {
        this.product.setSofa('小米智能沙发');
    };
    MiDecorator.prototype.buildTV = function () {
        this.product.setTV('小米智能电视');
    };
    return MiDecorator;
}(Decorator));
// 具体的装修工
var AppleDecorator = /** @class */ (function (_super) {
    __extends(AppleDecorator, _super);
    function AppleDecorator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppleDecorator.prototype.buildWall = function () {
        this.product.setWall('Apple智能墙');
    };
    AppleDecorator.prototype.buildSofa = function () {
        this.product.setSofa('Apple智能沙发');
    };
    AppleDecorator.prototype.buildTV = function () {
        this.product.setTV('Apple智能电视');
    };
    return AppleDecorator;
}(Decorator));
// 包工头
var ProjectMananger = /** @class */ (function () {
    function ProjectMananger(decorator) {
        this.decorator = decorator;
    }
    // 命令装修
    ProjectMananger.prototype.decorate = function () {
        this.decorator.buildWall();
        this.decorator.buildSofa();
        this.decorator.buildTV();
        return this.decorator.getResult();
    };
    return ProjectMananger;
}());
(function mainFun() {
    // 选择某牌子装修工
    var decorator = new MiDecorator();
    // 叫包工头排这个装修工装修
    var manage = new ProjectMananger(decorator);
    // 进行装修，并返回装修好的放假
    var product = manage.decorate();
    product.show();
})();
