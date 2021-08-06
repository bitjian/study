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
// 具体的芯片
var AMDChip = /** @class */ (function () {
    function AMDChip() {
    }
    AMDChip.prototype.getChip = function () {
        return 'AMD芯片';
    };
    return AMDChip;
}());
var CoreChip = /** @class */ (function () {
    function CoreChip() {
    }
    CoreChip.prototype.getChip = function () {
        return 'Intel Core 芯片';
    };
    return CoreChip;
}());
var MaxScreen = /** @class */ (function () {
    function MaxScreen() {
    }
    MaxScreen.prototype.getSize = function () {
        return '16寸显示屏';
    };
    return MaxScreen;
}());
var NormalScreen = /** @class */ (function () {
    function NormalScreen() {
    }
    NormalScreen.prototype.getSize = function () {
        return '15.5寸显示屏';
    };
    return NormalScreen;
}());
var Computer = /** @class */ (function () {
    // 不要通过构造函数，初始化芯片和屏幕 不然就不能随意更改了
    function Computer() {
    }
    Computer.prototype.setChip = function (chip) {
        this.chip = chip;
    };
    Computer.prototype.setSize = function (screenSize) {
        this.screenSize = screenSize;
    };
    return Computer;
}());
var GameComputer = /** @class */ (function (_super) {
    __extends(GameComputer, _super);
    function GameComputer() {
        return _super.call(this) || this;
    }
    GameComputer.prototype.getName = function () {
        console.log("\u8FD9\u662F\u4E00\u4E2A" + this.chip.getChip() + "\uFF0C" + this.screenSize.getSize() + "\u7684\u6E38\u620F\u672C");
    };
    return GameComputer;
}(Computer));
(function mainFunc() {
    var amdChip = new AMDChip();
    var screenSize = new MaxScreen();
    var gameComputer = new GameComputer();
    gameComputer.setChip(amdChip);
    gameComputer.setSize(screenSize);
    gameComputer.getName();
    var coreChip = new CoreChip();
    gameComputer.setChip(coreChip);
    gameComputer.getName();
})();
