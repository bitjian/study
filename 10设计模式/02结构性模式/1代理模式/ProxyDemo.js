"use strict";
exports.__esModule = true;
// 房东
var Landlord = /** @class */ (function () {
    function Landlord(position) {
        this.position = position;
    }
    Landlord.prototype.display = function () {
        console.log(this.position);
    };
    return Landlord;
}());
// 中介
var HouseAgent = /** @class */ (function () {
    function HouseAgent(fd) {
        this.landlord = fd;
    }
    HouseAgent.prototype.display = function () {
        this.customPay();
        this.landlord.display();
        this.landlordPay();
    };
    HouseAgent.prototype.landlordPay = function () {
        console.log("收取房东一半的中介费");
    };
    HouseAgent.prototype.customPay = function () {
        console.log("收取你一半的中介费");
    };
    return HouseAgent;
}());
(function MainFunc() {
    var landlord = new Landlord('金地艺境21栋1单元806');
    var agent = new HouseAgent(landlord);
    agent.display();
})();
