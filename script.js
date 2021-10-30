'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-10-20T17:01:17.194Z',
    '2020-10-21T23:36:17.929Z',
    '2021-10-22T10:51:36.790Z',
  ],
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
    '2021-01-25T14:18:46.235Z',
    '2021-02-05T16:33:06.386Z',
    '2021-10-20T14:43:26.374Z',
    '2021-10-21T18:49:59.371Z',
    '2021-10-22T12:01:20.894Z',
  ],
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2021-10-20T14:43:26.374Z',
    '2021-10-21T18:49:59.371Z',
    '2021-10-22T12:01:20.894Z',
  ],
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-10-20T17:01:17.194Z',
    '2021-10-21T23:36:17.929Z',
    '2021-10-22T10:51:36.790Z',
  ],
};

const accounts = [account1, account2, account3, account4];

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

// functions

const formatcur = function (value, locale) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const formatdate = function (date) {
  const calcdayspassed = (day1, day2) =>
    Math.round(Math.abs(day2 - day1) / (24 * 60 * 60 * 1000));
  const dayspassed = calcdayspassed(new Date(date), new Date());
  console.log(dayspassed);
  if (dayspassed === 0) return 'Today';
  if (dayspassed === 1) return 'Yesterday';
  if (dayspassed <= 7) return `${dayspassed} days ago`;
  else {
    // const dis_date = new Date(date);
    // const day = `${dis_date.getDate()}`.padStart(2, 0);
    // const month = `${dis_date.getMonth() + 1}`.padStart(2, 0);
    // const year = dis_date.getFullYear();
    // const display_date = `${day}/${month}/${year}`;
    // return display_date;
    console.log(date);
    const locale = navigator.language;
    return new Intl.DateTimeFormat(locale).format(new Date(date));
  }

  // return display_date;

  // console.log(dayspassed);
};

// experminenting internationalisation

// const now = new Date();
// const option = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
//   weekday: 'long',
// };
// const locale = navigator.language; // this we use to get the language of browser which we r using
// console.log(locale);

// labelDate.textContent = new Intl.DateTimeFormat(locale, option).format(now);

const displayMovements = function (accounts, sort = false) {
  containerMovements.innerHTML = ''; // used to empty the html same as we done in textcontent

  const movs = sort
    ? accounts.movements.slice().sort((a, b) => a - b)
    : accounts.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const display_date = formatdate(accounts.movementsDates[i]);
    const formattedmov = formatcur(mov, navigator.language);
    // const formattedmovement = new Intl.NumberFormat(navigator.language, {
    //   style: 'currency',
    //   currency: 'USD',
    // }).format(mov);
    // console.log(formattedmovement);
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${display_date}</div>
    <div class="movements__value">${formattedmov}</div>
  </div>`;
    // .insertAdjacentHTML used to add html
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//displayMovements(account1.movements);

const createusername = function (acc) {
  acc.forEach(function (accs) {
    accs.username = accs.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
};
createusername(accounts);

const updateui = function (acc) {
  // DISPLAY MOVEMENT
  displayMovements(acc);

  // DISPLAY BALANCE
  calcdisplaysum(acc);

  // DISPLAY SUMMARY
  calcdisplaybal(acc);
};
//calcprintbal(account1.movements);
//console.log(containerMovements.innerHTML);
const calcdisplaysum = function (acc) {
  const credit = acc.movements
    .filter(mov => mov > 0)
    .reduce((sum, cre) => sum + cre, 0);
  const formattedcredit = formatcur(credit, navigator.language);
  labelSumIn.textContent = `${formattedcredit}`;

  const debit = acc.movements
    .filter(deb => deb < 0)
    .reduce((deb, mov) => deb + mov, 0);
  const formatteddebit = formatcur(debit, navigator.language);
  labelSumOut.textContent = `${formatteddebit}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (acc.interestRate * 1.2) / 100)
    .reduce((add, int) => add + int, 0);
  const formattedint = formatcur(interest, navigator.language);
  labelSumInterest.textContent = `${formattedint}`;
};
//calcdisplaybalsum(account1.movements);

const calcdisplaybal = function (acc) {
  acc.balance = acc.movements.reduce((accu, mov) => accu + mov, 0);
  const formattedbal = formatcur(acc.balance, navigator.language);
  labelBalance.textContent = `${formattedbal}`;
};

const startlogouttimer = function () {
  // SETTING TIMER TO 100 SEC
  const ticking = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // IN EACH CALL PRINT REM TIME
    labelTimer.textContent = `${min}:${sec}`;

    // IF TIMER REACHES 0 SECONDS LOGOUT USER and stop timer
    if (time === 0) {
      clearTimeout(timer);
      //    labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    // decrease 1 second
    time--;
  };
  let time = 300;

  // CALL THE TIMER EVERY SECOND
  ticking();
  const timer = setInterval(ticking, 1000);
  return timer;
};

// EVENT HANDLER
let current_account, timer;

btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting i.e doesn't reload page when hit submit button
  e.preventDefault();
  current_account = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  //  console.log(current_account);
  if (current_account?.pin === Number(inputLoginPin.value)) {
    // DISPLAY UI AND MESSAGE
    labelWelcome.textContent = `Welcome Back, ${
      current_account.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    const now = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };
    const locale = navigator.language;
    //    console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(locale, option).format(now);

    // const curr_date = new Date();
    // const day = `${curr_date.getDate()}`.padStart(2, 0);
    // const month = `${curr_date.getMonth()}`.padStart(2, 0);
    // const year = curr_date.getFullYear();
    // const hour = `${curr_date.getHours()}`.padStart(2, 0);
    // const min = `${curr_date.getMinutes()}`.padStart(2, 0);

    // // displaying in day month nd year format
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // CLEARING INPUT FIELDS
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startlogouttimer();
    // UPDATE UI
    updateui(current_account);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciever_account = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    reciever_account &&
    current_account.balance >= amount &&
    reciever_account?.username !== current_account.username
  ) {
    // DOING TRANSFER
    current_account.movements.push(-amount);
    reciever_account.movements.push(amount);
    // adding date to reciver account
    current_account.movementsDates.push(new Date());
    reciever_account.movementsDates.push(new Date());
    updateui(current_account);

    //reset timer
    clearInterval(timer);
    timer = startlogouttimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loan_amount = Number(inputLoanAmount.value);
  if (
    loan_amount > 0 &&
    current_account.movements.some(mov => mov >= 0.1 * loan_amount)
  ) {
    setTimeout(() => {
      current_account.movements.push(loan_amount);
      current_account.movementsDates.push(new Date());
      updateui(current_account);

      // reset timer
      clearInterval(timer);
      timer = startlogouttimer();
    }, 300);
    // current_account.movements.push(loan_amount);
    // current_account.movementsDates.push(new Date());
    // updateui(current_account);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const account_close_user = inputCloseUsername.value;
  const account_close_pin = Number(inputClosePin.value);
  if (
    account_close_user &&
    account_close_pin &&
    current_account.username === account_close_user &&
    current_account.pin === account_close_pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === current_account.username
    );

    // DELETING ACCOUNT
    accounts.splice(index, 1);

    // HIDE UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted_state = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('working');
  displayMovements(current_account.movements, !sorted_state);
  sorted_state = !sorted_state;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////
// let arr = ['a', 'b', 'c', 'd', 'e'];
// // SLICE METHOD
// console.log(arr.slice(2));
// console.log(arr.slice(2, 3));
// console.log(arr.slice(0, -3));
// console.log([...arr]);

// // SPLICE METHOD
// //console.log(arr.splice(2));
// arr.splice(-1);
// console.log(arr);
// arr.splice(1, 2);
// console.log(arr);

// // REVERSE
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['f', 'g', 'h', 'i', 'j'];
// console.log(arr2.reverse());
// console.log(arr2);

// // CONCAT
// const letters = arr.concat(arr);
// console.log(letters);
// console.log([...arr, ...arr2]);

// //JOIN
// console.log(letters.join('-'));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const i in movements) {
//   console.log(movements[i]);
// }

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: you deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}:you withdraw ${Math.abs(movement)}`);
//   }
// }
// console.log('--------------FOR EACH----------------');
// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1}:you deposited ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1}:you withdraw ${Math.abs(movement)}`);
//   }
// });

//MAP
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, m) {
//   console.log(`${key}: ${value}`);
// });

// // SET

// const currenciesunique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesunique);
// currenciesunique.forEach(function (value, _, set) {
//   console.log(`${value}: ${value}`); // set doesn't have key thats's why key==values
// });

// const checkdogs = function (dogjulia, dogkate) {
//   const djuliacorr = dogjulia.slice();
//   djuliacorr.splice(0, 1);
//   djuliacorr.splice(-2);
//   // or we can also do this djuliacorr.slice(1,3);
//   const dogs = djuliacorr.concat(dogkate);
//   dogs.forEach(function (dog, i) {
//     if (dog >= 3) {
//       console.log(`dog number ${i + 1} is adult with ${dog} years of age`);
//     } else {
//       console.log(`dog number ${i + 1} is puppy with ${dog} years of age 🐶`);
//     }
//   });
// };

// checkdogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// map method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurtousd = 1.1;
// // const movementsusd = movements.map(function (mov) {
// //   return mov * eurtousd;
// // });
// console.log(movements);
// //console.log(movementsusd);

// const moveusd = [];
// for (const mov of movements) {
//   moveusd.push(mov * eurtousd);
// }
// console.log(moveusd);

// const movementsusd = movements.map(mov => mov * eurtousd);
// console.log(movementsusd);

// const movdesc = movements.map(function (mov, i) {
//   return `Movement ${i + 1}:you ${mov > 0 ? 'deposited' : 'withdraw'} ${mov}`;
// });
// console.log(movdesc);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(movements);
// console.log(deposits);

// const withdraw = movements.filter(function (mov) {
//   return mov < 0;
// });
// console.log(withdraw);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(
//   movements.reduce(function (accu, cur, i, mov) {
//     return accu + cur;
//   }, 0) // 0 defines the initial value for accu
// );

// // maximum value
// const max = movements.reduce(function (maxi, mov) {
//   return mov > maxi ? mov : maxi;
// }, movements[0]);
// console.log(max);

// const calcage = function (t1) {
//   const humanage = t1.map(function (age) {
//     if (age <= 2) return 2 * age;
//     else return 16 + 4 * age;
//   });
//   console.log(humanage);
//   const adult = humanage.filter(function (age) {
//     return age > 18;
//   });
//   const ans = adult.reduce(function (sum, age) {
//     return sum + age / adult.length;
//   }, 0);
//   console.log(ans);
// };

// calcage([5, 2, 4, 1, 15, 8, 3]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.find(mov => mov < 0));

// console.log(accounts);
// const acc = accounts.find(acco => acco.owner === 'Jessica Davis');
// console.log(acc);

// const a = [5, 4, 3, 2, 1];
// a.sort((a, b) => a - b);
// console.log(...a);

// const dogs = [
//   { weight: 22, curfood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curfood: 200, owners: ['Matilda'] },
//   { weight: 13, curfood: 275, owners: ['Sarah', 'Jon'] },
//   { weight: 32, curfood: 340, owners: ['Michael'] },
// ];

// dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
// console.log(dogs);

// const dogsarah = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(dogsarah);
// console.log(
//   `Sarah dog is eating ${
//     dogsarah.recFood < dogsarah.curfood ? 'too much' : 'less'
//   }`
// );

// let ownerseat2much = [];
// let ownerseat2less = [];
// dogs.forEach(dog =>
//   dog.curfood > dog.recFood
//     ? ownerseat2much.push(dog.owners)
//     : ownerseat2less.push(dog.owners)
// );
// ownerseat2less = ownerseat2less.flat();
// ownerseat2much = ownerseat2much.flat();
// console.log(`${ownerseat2much.join(' and ')} eats 2 much`);
// console.log(`${ownerseat2less.join(' and ')} eats 2 less`);

// const da = {
//   move: '2020-11-18T21:31:17.178z',
// };

// console.log(new Date(da.move).getMonth());

// internationalisation on numbers for formatting

// const option = {
//   style: 'currency',
//   unit: 'celsius',
//   currency: 'EUR',
// };
// const num = 7234723.87;
// console.log(new Intl.NumberFormat('en-US', option).format(num));
// console.log(new Intl.NumberFormat('de-DE', option).format(num));
// console.log(new Intl.NumberFormat(navigator.language, option).format(num));

// TIMER IN JS

// SET TIMEOUT FUNC

// const ing = ['olive', 'peas'];
// const pizzt = setTimeout(
//   (ing1, ing2) => console.log(`here is your pizza with ${ing1} and ${ing2}`),
//   3000,
//   ...ing
// );
// console.log('waiting');

// if (ing.includes('pea')) clearTimeout(pizzt);

// SET INTERVAL FUNC
// setInterval(() => {
//   const now = new Date();
//   console.log(now.getHours(), now.getMinutes(), now.getSeconds());
// }, 1000);
