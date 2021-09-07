const _ = require('lodash')

var object = { 'a': [{ 'b': { 'c': 3 } }] };


console.log(_.get(object, 'a[0].b.c'))
