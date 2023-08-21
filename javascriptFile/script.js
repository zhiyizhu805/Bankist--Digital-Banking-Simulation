'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-07-01T17:01:17.194Z',
    '2023-07-03T00:36:17.929Z',
    '2023-07-04T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
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

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//13)date format function : dynamic dates displayed
const formatDate = (date1, date2, locale) => {
  const dayDifference = Math.floor(
    Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)
  );
  if (dayDifference === 0) return 'Today';
  else if (dayDifference === 1) return 'Yesterday';
  else if (dayDifference <= 7) return `${dayDifference} days ago`;
  else {
    // old way
    // const day = `${date1.getDate()}`.padStart(2, 0);
    // const month = `${date1.getMonth() + 1}`.padStart(2, 0);
    // const year = date1.getFullYear();
    // return `${day}/${month}/${year}`;

    //use internationalized API
    return Intl.DateTimeFormat(locale).format(date1);
  }
};

//15.1) create format money function
const formatMoney = (locale, money, currencyType) => {
  const options = {
    style: 'currency',
    currency: currencyType,
  };
  return new Intl.NumberFormat(locale, options).format(money);
};

//12) display date for every transaction
//9) implementing sorting array function
//1) display movements
function displayMovements(acc, sort = false) {
  // console.log('movements', movements);
  //since only one type at each loop ,can simply put mov variable in here
  //without creating a function
  const type = mov => (mov > 0 ? 'deposit' : 'withdrawal');
  //simply clear all html tags inside the movements tag
  containerMovements.innerHTML = '';
  //9.1 define a dynamic movement variable according to sort equal to true or false
  //   use .slice() to copy the array since the .sort() will change the underlying array

  const sortMovements = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  //9.2 replace the original movements. to sortMovements.

  sortMovements.forEach(function (mov, i) {
    //12) date get from array
    const eachDate = new Date(acc.movementsDates[i]);
    //13) call format date function
    const formatDateDisplay =
      sortStatus === false ? formatDate(eachDate, new Date(), acc.locale) : '';

    //15.2) call format money function
    const formatMoneyDisplay = formatMoney(acc.locale, mov, acc.currency);

    const HTML = `<div class="movements__row">
    <div class="movements__type movements__type--${type(mov)}">${i + 1} ${type(
      mov
    )}</div>
    <div class="movements__date">${formatDateDisplay}</div>
    <div class="movements__value">${formatMoneyDisplay}</div>
  </div>
`;
    // basically the order DESC or NOT// containerMovements.insertAdjacentHTML('beforeend', HTML);
    containerMovements.insertAdjacentHTML('afterbegin', HTML);
  });
}
// displayMovements(account1.movements);

//9.3 sort button
//9.4 need to define sortStatus outside of the function
let sortStatus = false;
btnSort.addEventListener('click', function (e) {
  //9.5 always prevent default
  e.preventDefault();
  //9.6 switching the sortStatus by use !
  sortStatus = !sortStatus;
  // console.log('sortStatusc after click', sortStatus);
  displayMovements(selectedAccount, sortStatus);
});

//2) compute user name  (expanded vesion with steps go to map.js)
const computeUserName = function (accs) {
  accs.forEach(
    acc =>
      (acc.userName = acc.owner
        .toLowerCase()
        .split(' ')
        .map(each => each[0])
        .join(''))
  );
};

computeUserName(accounts);

//3) display balance
const computeBalence = function (acc) {
  acc.balence = acc.movements.reduce(
    (accumulator, curEl) => accumulator + Number(curEl),
    0
  );
  //old way
  // labelBalance.textContent = `${acc.balence.toFixed(2)}€`;
  //15.3) call format money function instead of use old way
  labelBalance.textContent = formatMoney(acc.locale, acc.balence, acc.currency);
};
// computeBalence(account1.movements);

//4)display income
const calcDisplaySummary = function (acc) {
  const totalIncome = acc.movements
    .filter(movement => movement > 0)
    .reduce((acc, mov) => acc + Number(mov), 0);
  // labelSumIn.textContent = `${totalIncome.toFixed(2)}€`;
  const totalOutcome = acc.movements
    .filter(movement => movement < 0)
    .reduce((acc, curEl) => acc + curEl);
  // labelSumOut.textContent = `${Math.abs(totalOutcome).toFixed(2)}€`;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  // labelSumInterest.textContent = `${interest.toFixed(2)}€`;
  //15.4 call format money function to display all three elements
  labelSumIn.textContent = formatMoney(acc.locale, totalIncome, acc.currency);
  labelSumOut.textContent = formatMoney(
    acc.locale,
    Math.abs(totalOutcome),
    acc.currency
  );
  labelSumInterest.textContent = formatMoney(
    acc.locale,
    interest,
    acc.currency
  );
};
// calcDisplaySummary(account1.movements);

//4.5
const displayUI = function (acc) {
  displayMovements(acc);
  computeBalence(acc);
  calcDisplaySummary(acc);
};

//5) implementing login function with .find() method
//1. define a global variable
//   you should understand why they need to be global
//   we want this variable persist through multiple logins
//   and we need them later for other operations
let selectedAccount, timer;
btnLogin.addEventListener('click', function (e) {
  //.preventDefault()阻止默认的事件行为发生。在这种情况下，
  //它阻止了表单提交按钮的默认行为,也就是阻止表单提交时页面的自动刷新。
  //因为这个button在表单里，如果点击的话就会默认提交然后自动刷新页面
  //但我们想要用户的用户名和密码经过我们定义的登入逻辑验证，
  //所以就可以使用 .preventDefault() 阻止默认行为
  // console.log('e', e);
  //2.prevent default submitting
  e.preventDefault();
  //3.get user input
  const userNameInput = inputLoginUsername.value;
  const pinInput = inputLoginPin.value;
  //4.get current account info (will be undefined if userinput account not exist)
  selectedAccount = accounts.find(acc => acc.userName === userNameInput);
  //5.check input pin match or not
  if (String(selectedAccount?.pin) === pinInput) {
    //6.dispaly operation interface
    containerApp.style.opacity = 1;
    //7.empty input box
    inputLoginUsername.value = inputLoginPin.value = '';
    //8.make cursor gone
    // inputLoginUsername.blur();
    inputLoginPin.blur();
    //9.display related account info
    labelWelcome.textContent = `Welcome ${
      selectedAccount.owner.split(' ')[0]
    }!`;

    //9.5 display internationlized formated dates
    //14.5) call the internationlizeDate function

    // //14.5.1) get locale from the user's browser
    // const locale = navigator.language; //locale: en-GB

    // //14.5.2) get locale from the each account
    const locale = selectedAccount.locale;

    //14.5.3) call the function
    labelDate.textContent = internationalizeDates(locale);
    //17) update the lable timer every 1 minute replace 14.5.3
    setInterval(
      () => (labelDate.textContent = internationalizeDates(locale)),
      1000 * 60
    );

    // //16.2) setLogOutTimer
    // setLogOutTimer();

    //17) check if a timer is running replace 16.2)
    console.log('timer', timer);
    //output: timer 4
    //the reason we return countdown value to setLogOutTimer() is that
    //we can see if its a time is currently running
    //if no timmer running  if (timer) will output undefined
    if (timer) clearInterval(timer);
    timer = setLogOutTimer();

    //display all related data
    displayUI(selectedAccount);
    //10.transfer money function standby
    transferMoney(selectedAccount);
  } else {
    //11.notice if wrong account userName or password
    alert('Wrong account or password!');
    inputLoginPin.value = '';
  }
});

//16.1)  set logout Timer
const setLogOutTimer = function () {
  let countDown = 60 * 5;
  const tick = function () {
    //string.padStart()  need to convert anyother type to string first
    const min = String(Math.floor(countDown / 60)).padStart(2, 0);
    const second = String(countDown % 60).padStart(2, 0);
    labelTimer.textContent = `⏰ ${min}:${second} `;
    //when time count down to 0 ,log out
    //only execute when its actually 0
    if (countDown === 0) {
      clearInterval(timer);
      logOut();
    }
    //decrease 1 second
    countDown = countDown - 1;
  };
  //immediately call the function so the initail clock time when user log in
  //will right be the pre-set time instead of only appear after one second
  tick();
  const counter = setInterval(tick, 1000);
  return counter;
};

//17) log out function
const logOut = function () {
  selectedAccount = '';
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
};

//6)inplementing transfer function
const transferMoney = function (acc) {
  btnTransfer.addEventListener('click', function (e) {
    // prevent default submit setting
    e.preventDefault();
    const tranferTo = accounts.find(
      acc => acc.userName === inputTransferTo.value
    );
    if (
      acc.userName !== inputTransferTo.value &&
      Number(inputTransferAmount.value) > 0 &&
      inputTransferAmount.value < acc.balence &&
      tranferTo
    ) {
      //transfer operation
      acc.movements.push(-Number(inputTransferAmount.value));
      tranferTo.movements.push(Number(inputTransferAmount.value));
      //add date to each transaction
      acc.movementsDates.push(new Date().toISOString());
      tranferTo.movementsDates.push(new Date().toISOString());

      //display UI
      displayUI(acc);
      //clear input boxes
      inputTransferAmount.value = inputTransferTo.value = '';
      //18)  reset timer
      clearInterval(timer);
      timer = setLogOutTimer();
    } else {
      inputTransferAmount.value = inputTransferTo.value = '';
      alert('Try again!');
    }
    // inputTransferAmount.value;
  });
};

//7)close account
btnClose.addEventListener('click', function (e) {
  //1.prevent default submitting
  e.preventDefault();
  // //No need to find account,just use the currentAccount
  // const account = accounts.find(
  //   acc => acc.userName === inputCloseUsername.value
  // ); // will be undefined if Dont have this input account

  //2.check if input account info equal to current account
  //  user current account info by global variable selectedAccount
  if (
    inputCloseUsername.value === selectedAccount.userName &&
    Number(inputClosePin.value) === selectedAccount.pin
  ) {
    //3. find currentAccount index in accounts array
    const accountIndex = accounts.findIndex(
      acc => acc.userName === selectedAccount.userName
    );
    //4.remove current account from the accounts array
    accounts.splice(accountIndex, 1);
    console.log(accounts);
    inputCloseUsername.value = inputClosePin.value = '';
    //5.hide user operation interface
    containerApp.style.opacity = 0;
  }
});

//8) request interest WITH .some()
btnLoan.addEventListener('click', function (e) {
  //1. prevent default submitting
  e.preventDefault();
  //2.get request loan amount
  const loanAmount = Math.floor(inputLoanAmount.value);
  //3.check request eligible or not
  if (
    loanAmount > 0 &&
    selectedAccount.movements.some(mov => mov >= loanAmount * 0.1)
  ) {
    //true
    //4.add requst amount to movements
    selectedAccount.movements.push(loanAmount);
    //4.5 add date for each loan transaction
    //has to be before the display UI
    selectedAccount.movementsDates.push(new Date().toISOString());
    //5.display UI
    setTimeout(() => {
      displayUI(selectedAccount);
    }, 1500);
    //6.clear input box
    inputLoanAmount.value = '';
    //18)  reset timer
    clearInterval(timer);
    timer = setLogOutTimer();
  } else {
    //false
    alert('Request declined!');
  }
});

//10 change row color use % remainder operator
//get array-like data
//convert to array first
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (mov, i) {
    if (i % 2 === 0) mov.style.backgroundColor = 'green';
    if (i % 3 === 0) mov.style.backgroundColor = 'blue';
  });
});

// //fake login
// selectedAccount = account1;
// displayUI(selectedAccount);
// containerApp.style.opacity = 1;

//Internatianalizing Dates  replace 11)
console.log('=======  Intl.DateTimeFormat() constructor =======');
//syntax:new Intl.DateTimeFormat(loaclString,optionsObject).format(date)

//14)  create a function where you pass in locale string ,the function will return
//     the corresponing formatted date

const internationalizeDates = locale => {
  //14.1)  get current time
  const currentTime = new Date();

  //14.2.1) Second parameter : customize the internationalizing formatted time
  //       customize the internationalizing formatted time
  //       if not specified will display default format
  //       you can specify to include which element OR NOT
  //       in the object(second parameter) of the constructor
  const options = {
    weekday: 'short', //long short narrow
    hour: 'numeric', //2-digit numeric
    minute: 'numeric', //2-digit numeric
    // second: 'numeric', //2-digit numeric
    year: 'numeric', //2-digit numeric
    month: 'short', //numeric 2-digit long short narrow
    day: '2-digit', //2-digit numeric
    // era: 'long',
    // timeZoneName: 'shortGeneric',
  };
  // //First parameter :different methods of setting locale:
  // //14.3.1)  manually define locale
  // labelDate.textContent = new Intl.DateTimeFormat('en-GB', options).format(
  //   currentTime
  // );

  //14.3.2) get locale from the user's browser
  // const localeLocalBrowser = navigator.language;
  // console.log('localeLocalBrowser:', localeLocalBrowser); //localeLocalBrowser: en-GB

  //14.2.2) set customized object to the second parameter
  //14.4)    on this formatter we call .format(date)

  //14.4.1) return the formatted date time - use 14.3.2 :user browser's locale
  //   return new Intl.DateTimeFormat(localeLocalBrowser, options).format(currentTime);
  // };

  //14.4.2) return the formatted date time - use account object locale parameter
  return new Intl.DateTimeFormat(locale, options).format(currentTime);
};

//create a formater according to locale string(the language and the country)
//'en-GB' 'en-GB'.. different locale will have different styles
//google ISO language code table go into linggoes.net

//11) date
// const currentTime = new Date();
// const date = `${currentTime.getDate()}`.padStart(2, 0);
// const month = `${currentTime.getMonth()}`.padStart(2, 0);
// const year = currentTime.getFullYear();
// const hour = `${currentTime.getHours()}`.padStart(2, 0);
// const min = `${currentTime.getMinutes()}`.padStart(2, 0);
// labelDate.textContent = ` ${date}/${month}/${year}, ${hour}:${min}`;

// ///////////////////////////////////////////////
// ///////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// ///////////////////////////////////////////////
