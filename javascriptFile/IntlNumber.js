//Internationalize Numbers
console.log('=======  Internationalize Numbers  =======');
//syntax:
// new Intl.NumberFormat(locale,optionObject).format(number)
const digit = 3216739.32;
const options2 = {
  //three different options for the style:currency,percent,unit
  //1)
  //   style: 'percent',
  //2)
  style: 'unit',
  unit: 'mile-per-hour', // 3,216,739.32 mph
  //3)
  //   style: 'currency',
  //   currency: 'EUR', //€3,216,739.32 //independtly need to be defined manually

  //   useGrouping: false, //en-US: 3216739.32 mph    NO seperator
};
const formatedDigit = (locale, options) =>
  new Intl.NumberFormat(locale, options).format(digit);
console.log('en-US:', formatedDigit('en-US', options2));
console.log('de-DE:', formatedDigit('de-DE', options2));
console.log('ar-SY:', formatedDigit('ar-SY', options2));
console.log(navigator.language, formatedDigit(navigator.language, options2));
