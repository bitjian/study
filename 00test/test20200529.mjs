import _ from 'lodash'

const arr = []

console.log( _.groupBy(arr, item => item.type) )