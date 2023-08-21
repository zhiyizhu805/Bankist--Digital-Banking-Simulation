'use strict';
console.log('=======  create a date  =======');
console.log('-------  new Date()  -------');
//1)  create current date time
const now = new Date();
console.log(now);
//Output: Tue Jul 04 2023 15:26:18 GMT+1200 (New Zealand Standard Time)

//2.1)  use new Date() constructor to create a specific date
//    hours:mins:seconds will auto be 0 if not specified
console.log(new Date('Aug 05 1995'));
//Output: Sat Aug 05 1995 00:00:00 GMT+1200 (New Zealand Standard Time)

//2.2) js is clever to get correct date
console.log(new Date('December 17,2022'));
//Sat Dec 17 2022 00:00:00 GMT+1300 (New Zealand Daylight Time)

// example data: DIFFERENT DATA! Contains movement dates, currency and locale
const account1Copy = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    //Z means time without timezone in London
    //also without daylight savings
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2Copy = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accountsCopy = [account1Copy, account2Copy];
console.log('-------  create date base on string date format  -------');
//3.1) get string format data from object
console.log(account1Copy.movementsDates[0]);
//Output: 2019-11-18T21:31:17.178Z

//3.2) convet date string to date
console.log('convet string to date:', new Date(account1Copy.movementsDates[0]));
//Output: Tue Nov 19 2019 10:31:17 GMT+1300 (New Zealand Daylight Time)

//3.3.1)  note Aug became Sep since javascript is 0 based
console.log(new Date(1995, 8, 5, 15, 4, 22));
//Output: Tue Sep 05 1995 15:04:22 GMT+1200 (New Zealand Standard Time)

//3.3.2)
console.log(new Date(1995, 7, 5, 15, 4, 22));
//Output: Sat Aug 05 1995 15:04:22 GMT+1200 (New Zealand Standard Time)

//3.4) js can auto correct date
console.log(new Date(2037, 10, 32)); //we all knew october dont have 32
//Output: Wed Dec 02 2037 00:00:00 GMT+1300 (New Zealand Daylight Time)

//3.5.1)  0 miliseconds after the initail unix time
console.log(new Date(0));
//Output: Thu Jan 01 1970 12:00:00 GMT+1200 (New Zealand Standard Time)

//3.5.2)  one minute later  the initail unix time
//Thu Jan 01 1970 12:00:00 GMT+1200 (New Zealand Standard Time)
console.log(new Date(1000)); //1000 miliseconds is one minute
//Output: date.js:76 Thu Jan 01 1970 12:00:01 GMT+1200 (New Zealand Standard Time)

//3.5.3)  three days later
console.log(new Date(3 * 24 * 60 * 60 * 1000));
//Output: Sun Jan 04 1970 12:00:00 GMT+1200 (New Zealand Standard Time)

console.log('=======  working with dates  =======');
const future = new Date(2037, 7, 5, 15, 30);
console.log(future);
//Wed Aug 05 2037 15:30:00 GMT+1200 (New Zealand Standard Time)
console.log('-------  Timestamp  -------');
//4.1)  timestamp is the miliseconds passed since JAN 1970
console.log(future.getTime()); //2133055800000

//4.2)  convert timestamp back to date
console.log(new Date(2133055800000));
//Wed Aug 05 2037 15:30:00 GMT+1200 (New Zealand Standard Time)

//4.3)  get current time's timestamp
console.log(Date.now());
console.log(new Date(1688443127339));
//Tue Jul 04 2023 15:58:47 GMT+1200 (New Zealand Standard Time)

console.log('-------  other date methods  -------');
console.log(future.getDate()); //5
console.log(future.getMonth()); //7 - 0 based -Aug
console.log(future.getDay()); //3 - day in a week - wednesday
console.log(future.getHours()); //15
console.log(future.getMinutes()); //30
console.log(future.getSeconds()); //0

console.log(future.getFullYear()); //2037
console.log(future.toISOString()); //2037-08-05T03:30:00.000Z

console.log('=======  dateOperation  =======');
const mythirty = new Date(2030, 8, 5, 15);
//convert the date time to number(timestamp)
console.log(Number(mythirty)); //1914807600000
console.log(+mythirty); //1914807600000

const dayDifference = function (date1, date2) {
  //1000 miliseconds = 1 second
  const difference = (date2 - date1) / (1000 * 60 * 60 * 24);
  return difference;
};
console.log(
  dayDifference(new Date(2023, 6, 17, 15), new Date(2023, 7, 17, 15))
); //31
