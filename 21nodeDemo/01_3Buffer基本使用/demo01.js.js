const b1 = Buffer.from('10')
const b2 = Buffer.from('10', 'utf8');
const b3 = Buffer.from([10]);
const b4 = Buffer.from(b3);

console.log(b1.toString(),b2+'',b3.toString(),b4)

