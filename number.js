console.log('=======  numbers  =======');
//base 10 : 0 - 9  1/10 = 0.1  3/10 = 3.33333333
//1) javaScript cannot display/calc some specific fraction like above
//   javaScript Binary base 2: 0 1
console.log(0.1 + 0.2); //0.30000000000000004
//an example in which is SHOULD be true
console.log(0.2 + 0.1 === 0.3); //false
console.log(3 / 10); //0.3

//2)  Conversion from String to Number
console.log(Number('23'));
console.log(+'23'); // easy/cleaner way
//when javaScript sees the + operator,it will do type coersion
console.log('------- Parsing  -------');
//3)  Parsing
//3.1)Number.parseInt():
//string start WITH number but contain other symbols afterwards
//Its ok there is some spaces before the starting number
//Number.parseInt(stringNeedToParse,10) always pass 10 in to avoid bugs
console.log(Number.parseInt('30jjjjj', 10)); //30
console.log(Number.parseInt('30.99jjjjj', 10)); //30
console.log(Number.parseInt('jjjjj40', 10)); //NaN

//3.2)Number.parseFloat()
//if you get DATA from CSS,always good to use .parseFloat
console.log(Number.parseFloat('  2.5em')); //2.5
console.log(Number.parseInt('  2.5em')); //2

console.log('-------  Number.isNaN()  -------');
//4)  Check if value is not a number
//Number.isNaN()
//false:是一个number true:的确不是Number
console.log(Number.isNaN(20)); //false
console.log(Number.isNaN('20')); //false
console.log(Number.isNaN('20px')); //false
console.log(Number.isNaN(+'20X')); //true
console.log(Number.isNaN(23 / 0)); //false

console.log('-------  Number.isFinite()  -------');
//5)  always use Number.isFinite() to check if value is number
//Checking if value is Number
//Number.isFinite()
//false: NOT a number  true: 是一个Number
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite('20')); //false
console.log(Number.isFinite(+'20')); //true
console.log(Number.isFinite(23 / 0)); //false

console.log('=======  .sqrt() 开方  =======');
//6)
console.log(Math.sqrt(25)); //5
console.log(25 ** (1 / 2)); //5
console.log(Math.sqrt(9)); //3

console.log('=======  Math.max()  =======');
//7) does NOT do parsing
console.log(Math.max(5, 6, 33, 42, 3)); //42
console.log(Math.max(5, 6, '33px', 42, 3)); //NaN

console.log('=======  Math.min()  =======');
//8)
console.log(Math.min(5, 6, 33, 42, 3)); //3
console.log(Math.min(5, 6, 33, 42, Number.parseInt('3px'))); //3
console.log(Math.min(5, 6, 33, 42, '3px')); //NaN

console.log('=======  Math.PI  =======');
//9
console.log(Math.PI * Number.parseFloat('10px') ** 2); //314.1592653589793

console.log('=======  random number  =======');
//10)  a random number between 1-6
console.log(Math.trunc(Math.random() * 6) + 1);

//random number function
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

console.log(randomNumber(4, 6));
console.log('=======  manipulating Intergers  =======');
//11)  manipulating Intergers
console.log('-------  Math.trunc()  -------');
//11.1)  去掉小数点后面的数字  Math.trunc()
//better be replaced by Math.floor()
console.log(Math.trunc(28.9)); //28

console.log('-------  Math.round()  -------');
//11.2)  四舍五入 Math.round()
console.log(Math.round(23.3)); //23
console.log(Math.round(23.9)); //24

console.log('-------  Math.ceil()  -------');
//11.3)  向上取整1 Math.ceil()
console.log(Math.ceil(23.3)); //23
console.log(Math.ceil(23.9)); //24

console.log('-------  Math.floor()  -------');
//11.4)  向下取整1 Math.floor()
//does type-coersion automatically
console.log(Math.floor(23.3)); //23
console.log(Math.floor(23.9)); //24

//11.5)  negative situation  Math.floor() is better than Math.trunc()
console.log(Math.trunc(-23.3)); //-23  -23 actually bigger than -23.3
console.log(Math.floor(-23.3)); //-24  This is what we want

console.log('=======  manipulating Decimals  =======');
console.log('-------  .toFixed(numberOfDigiAfterPoint)  -------');
//12)  四舍五入到你想要的小数点后几位数
console.log((2.7).toFixed(0)); //3  String
console.log((2.4).toFixed(3)); //2.400 String
console.log((2.345).toFixed(2)); //2.35  String
console.log(+(2.345).toFixed(2)); //2.35 Number
