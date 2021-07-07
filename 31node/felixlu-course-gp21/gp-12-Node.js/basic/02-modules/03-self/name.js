const _name = 'junhao'

const Name = {
  name: _name,
  sayName() {
    return this.name
  }
}

exports.Name = Name
exports._name = _name
// exports = Name
console.log(module.exports, exports)
// exports = name