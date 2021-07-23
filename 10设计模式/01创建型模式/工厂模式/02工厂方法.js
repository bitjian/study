"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var HorseFarm = /** @class */ (function () {
    function HorseFarm() {
    }
    HorseFarm.prototype.newAnimal = function () {
        return new Horse();
    };
    return HorseFarm;
}());
var CattleFarm = /** @class */ (function () {
    function CattleFarm() {
    }
    CattleFarm.prototype.newAnimal = function () {
        return new Cattle();
    };
    return CattleFarm;
}());
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Horse.prototype.show = function () {
        console.log('this is Horse');
    };
    return Horse;
}(Animal));
var Cattle = /** @class */ (function (_super) {
    __extends(Cattle, _super);
    function Cattle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cattle.prototype.show = function () {
        console.log('this is Cattle');
    };
    return Cattle;
}(Animal));
var FarmFactory = /** @class */ (function () {
    function FarmFactory() {
    }
    FarmFactory.getFarm = function (type) {
        var instance;
        if (type === 'horse') {
            instance = new HorseFarm();
        }
        if (type === 'cattle') {
            instance = new CattleFarm();
        }
        return instance;
    };
    return FarmFactory;
}());
var f1 = FarmFactory.getFarm('horse');
var horse = f1.newAnimal();
horse.show();
