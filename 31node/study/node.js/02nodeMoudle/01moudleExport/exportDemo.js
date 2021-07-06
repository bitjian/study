const a = 'a'

// exports.a = a //√ ===  module.exports = {a:a}
// exports = a  // × exports -> a
module.exports = {a:a}