let company = {
  sales: [{
    name: 'John',
    salary: 1111.11
  }, {
    name: 'Alice',
    salary: 1661.16
  }],

  development: {
    sites: [{
      name: 'Peter',
      salary: 2002.20
    }, {
      name: 'Alex',
      salary: 1899.99
    }],

    internals: [{
      name: 'Jack',
      salary: 1366.33
    }]
  }
};
// 求company所有的salary

function getSumSalary(params) {
  // 如果参数是数组格式，则求和
  if (Array.isArray(params)) {
    return params.reduce((start, next) => {
      return start + next.salary
    }, 0)
  } else {
    // 如果是对象，则获取对象里的部门信息
    let sum = 0
    // 获取部门信息
    for (let devInfo of Object.values(params)) {
      sum += getSumSalary(devInfo)
    }
    return sum

  }
}
const sumSalary = getSumSalary(company)
console.log(sumSalary)

export {}