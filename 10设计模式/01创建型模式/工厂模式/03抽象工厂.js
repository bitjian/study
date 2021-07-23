"use strict";
var SRFarm = /** @class */ (function () {
    function SRFarm() {
        console.log('welcome to SRFarm ,we have horse and fruit');
    }
    SRFarm.prototype.newAnimal = function () {
        return new A_Horse();
    };
    SRFarm.prototype.newPlant = function () {
        return new P_Fruitage();
    };
    return SRFarm;
}());
var SGFarm = /** @class */ (function () {
    function SGFarm() {
    }
    SGFarm.prototype.newAnimal = function () {
        return new A_Cattle();
    };
    SGFarm.prototype.newPlant = function () {
        return new P_Vegetables();
    };
    return SGFarm;
}());
var A_Horse = /** @class */ (function () {
    function A_Horse() {
    }
    A_Horse.prototype.show = function () {
        console.log('this is horse');
    };
    return A_Horse;
}());
var A_Cattle = /** @class */ (function () {
    function A_Cattle() {
    }
    A_Cattle.prototype.show = function () {
        console.log('this is cattle');
    };
    return A_Cattle;
}());
var P_Fruitage = /** @class */ (function () {
    function P_Fruitage() {
    }
    P_Fruitage.prototype.show = function () {
        console.log('this is fruit');
    };
    return P_Fruitage;
}());
var P_Vegetables = /** @class */ (function () {
    function P_Vegetables() {
    }
    P_Vegetables.prototype.show = function () {
        console.log('this is vegetable');
    };
    return P_Vegetables;
}());
var Client = /** @class */ (function () {
    function Client() {
        this.farm = new SRFarm();
        this.animal = this.farm.newAnimal();
        this.plant = this.farm.newPlant();
    }
    return Client;
}());
var c1 = new Client();
c1.animal.show();
c1.plant.show();
