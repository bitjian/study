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
var AbstractHandler = /** @class */ (function () {
    function AbstractHandler() {
    }
    AbstractHandler.prototype.addMiddleware = function (h) {
        this.next = h;
        return this.next;
    };
    AbstractHandler.prototype.get = function (url, callback) {
        if (this.next) {
            console.log(this.next);
            return this.next.get(url, callback);
        }
    };
    return AbstractHandler;
}());
// 定义Auth中间件
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth(username, password) {
        var _this = _super.call(this) || this;
        _this.isAuthenticated = false;
        if (username === 'abao' && password === '123') {
            _this.isAuthenticated = true;
        }
        return _this;
    }
    Auth.prototype.get = function (url, callback) {
        if (this.isAuthenticated) {
            return _super.prototype.get.call(this, url, callback);
        }
        else {
            throw new Error('Not Authorized');
        }
    };
    return Auth;
}(AbstractHandler));
// 定义Logger中间件
var Logger = /** @class */ (function (_super) {
    __extends(Logger, _super);
    function Logger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Logger.prototype.get = function (url, callback) {
        console.log('/GET Request to: ', url);
        return _super.prototype.get.call(this, url, callback);
    };
    return Logger;
}(AbstractHandler));
var Route = /** @class */ (function (_super) {
    __extends(Route, _super);
    function Route() {
        var _this = _super.call(this) || this;
        _this.URLMaps = {
            '/api/todos': [{ title: 'learn ts' }, { title: 'learn react' }],
            '/api/random': Math.random()
        };
        return _this;
    }
    Route.prototype.get = function (url, callback) {
        _super.prototype.get.call(this, url, callback);
        if (this.URLMaps.hasOwnProperty(url)) {
            callback(this.URLMaps[url]);
        }
    };
    return Route;
}(AbstractHandler));
var route = new Route();
route.addMiddleware(new Auth('abao', '123')).addMiddleware(new Logger());
console.log(route, route.next, 'route.next');
route.get('/api/todos', function (data) {
    console.log(JSON.stringify({ data: data }, null, 2));
});
route.get('/api/random', function (data) {
    console.log(data);
});
