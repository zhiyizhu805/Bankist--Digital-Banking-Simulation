'use strict';

//the biggest safe integer in js
console.log(2 ** 53 - 1); //9007199254740991
console.log(Number.MAX_SAFE_INTEGER); //9007199254740991
//IF an int larger than the safe int, the result will become not precise

console.log('=======  .BigInt()   =======');
//use big int operator : n
//can NOT mix big int with normal int(two exceptions)
console.log(4783194638921479873104710n); //4783194638921479873104710n
console.log(BigInt(4324321n)); //4324321n

const huge = 67889780790789608689n;
const numm = 23;
// console.log(huge * numm);
//cannot mix BigInt and other types, use explicit conversions
console.log(huge * 2n); //135779561581579217378n
console.log('-------  exception1  -------');
//1)comparison operator: bigInt can be placed with normal type
console.log(20n > 15); //true
console.log(20n === 20); //false  NO type coersion
console.log(typeof 20n, typeof 20); //bigint number
console.log(20n == '20'); //true  WITH type coersion

console.log('-------  exception2  -------');
//2)plus operator when working with strings
console.log(huge + 'is really huge'); //67889780790789608689is really huge

console.log('-------  WITH division  -------');
console.log(11n / 3n); //3n  simply return the closest int number
console.log(11 / 3); //3.6666666666666665
