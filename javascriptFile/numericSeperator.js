'use strict';
console.log('=======  numeric seperator _  =======');
//287,460,000,000
//use _ in a Number type data
//only between number and number
const diameter = 287_460_000_000;
console.log(diameter); //287460000000

const price = 345_99;
console.log(price); //34599

//NOT work
//the underscore not work inside the string
console.log(Number('2300_000')); //NaN
console.log(parseInt('2300_000')); //2300
