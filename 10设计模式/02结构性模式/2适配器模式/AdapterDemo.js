// 适配器，有一个两口的插座，但是我的插头是三口的，需要找一个适配器去匹配三口的插头
// 把不支持的接口变得支持
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
// 有一个两口的插座
var SocketForTwo = /** @class */ (function () {
    function SocketForTwo() {
        this.num = 2;
    }
    SocketForTwo.prototype.socketForTwo = function (plugs) {
        console.log(plugs + '口插头插入');
        if (plugs !== this.num)
            return console.log('接口不适配');
        console.log('两口插座 为爱发电');
    };
    return SocketForTwo;
}());
// 三口插头
var PlugForThree = /** @class */ (function () {
    function PlugForThree() {
        this.num = 3;
    }
    PlugForThree.prototype.plug = function () {
        console.log("\u6211\u6709" + this.num + "\u53E3\u63D2\u5934");
    };
    return PlugForThree;
}());
// 适配器
var SocketAdapter = /** @class */ (function (_super) {
    __extends(SocketAdapter, _super);
    function SocketAdapter(socketIns) {
        var _this = _super.call(this) || this;
        _this.socketIns = socketIns;
        _this.num = 2;
        return _this;
    }
    SocketAdapter.prototype.plug = function () {
        console.log('我是适配器，我是%d插头', this.num);
    };
    SocketAdapter.prototype.socket = function (plugs) {
        // 接通两口插座
        this.socketIns.socketForTwo(this.num);
        console.log('万能插座 支持两口，三口，usb');
        console.log('%d口插头插入适配器插口,通电成功', plugs);
        console.log('万能插座 为爱发电');
    };
    return SocketAdapter;
}(PlugForThree));
(function mainFunc() {
    var plug = new PlugForThree();
    plug.plug();
    // 插入插座不太行
    var socket = new SocketForTwo();
    socket.socketForTwo(plug.num);
    // 创建适配器
    var adapter = new SocketAdapter(socket);
    adapter.plug();
    adapter.socket(plug.num);
})();
