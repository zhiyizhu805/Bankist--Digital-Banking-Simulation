'use strict';
console.log('=======  setTimeOut(call-back,Time,...arguments)  =======');

console.log('-------  setTimeOut()  -------');
//1) use setTimeOut() to set a timer
const ings = ['spinach', 'tomato'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`${ing1} and ${ing2} is ready!`),
  3000,
  ...ings
);
console.log('waiting....');
//the setTimeOut function will call the arrow(call-back) function
//after the pre-set time.the arguments for the call-back function
//will be placed from the third argument.

console.log('-------  clearTimeout()  -------');
//2) clear a Timer
if (ings.includes('tomato')) clearTimeout(pizzaTimer);

console.log('-------  setInterval()  -------');
// //example:
// const clock = setInterval(() => {
//   const now3 = new Date();
//   console.log(now3);
// }, 1000);

// // create a real clock base on the example above
// const clock = setInterval(() => {
//   const now3 = new Date();
//   const hour3 = now3.getHours();
//   const minute3 = now3.getMinutes();
//   const second3 = now3.getSeconds();
//   console.log(`${hour3}:${minute3}:${second3}`);
// }, 1000);

const clock = setInterval(() => {
  const clockDisplay = new Intl.DateTimeFormat(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date());
  console.log(clockDisplay);
}, 1000);
clearInterval(clock);

const fiveMins = new Date(1000 * 60 * 5);
console.log(fiveMins.getTime());
