console.log('=======  remainder operator %  =======');
//取余
//even 偶数取余2为0
//odd 奇数取余2不为0

console.log(5 / 3); //1.6666666666666667
console.log(5 % 3); //2

console.log(8 / 3); //2.6666666666666665
console.log(8 % 3); //2

console.log(6 / 2); //3
console.log(6 % 2); //0

const isEven = n => n % 2 === 0;
console.log(isEven(9)); //false
console.log(isEven(10)); //true
console.log(isEven(0)); //true
