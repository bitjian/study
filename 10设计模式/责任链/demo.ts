interface IHandler {
  addMiddleware(h: IHandler): IHandler;
  get(url: string, callback: (data: any) => void): void;
}

abstract class AbstractHandler implements IHandler {
  next!: IHandler;
  addMiddleware(h: IHandler) {
    this.next = h;
    return this.next;
  }

  get(url: string, callback: (data: any) => void) {
    if (this.next) {
      return this.next.get(url, callback);
    }
  }
}

// 定义Auth中间件
class Auth extends AbstractHandler {
  isAuthenticated: boolean;
  constructor(username: string, password: string) {
    super();

    this.isAuthenticated = false;
    if (username === 'abao' && password === '123') {
      this.isAuthenticated = true;
    }
  }

  get(url: string, callback: (data: any) => void) {
    if (this.isAuthenticated) {
      return super.get(url, callback);
    } else {
      throw new Error('Not Authorized');
    }
  }
}

// 定义Logger中间件
class Logger extends AbstractHandler {
  get(url: string, callback: (data: any) => void) {
    console.log('/GET Request to: ', url);
    return super.get(url, callback);
  }
}

class Route extends AbstractHandler {
  URLMaps: {[key: string]: any};
  constructor() {
    super();
    this.URLMaps = {
      '/api/todos': [{ title: 'learn ts' }, { title: 'learn react' }],
      '/api/random': Math.random(),
    };
  }

  get(url: string, callback: (data: any) => void) {
    super.get(url, callback);

    if (this.URLMaps.hasOwnProperty(url)) {
      callback(this.URLMaps[url]);
    }
  }
}

const route = new Route();
route.addMiddleware(new Auth('abao', '123')).addMiddleware(new Logger());
route.get('/api/todos', data => {
  console.log(JSON.stringify({ data }, null, 2));
});

route.get('/api/random', data => {
  console.log(data);
});