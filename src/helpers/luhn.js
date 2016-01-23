export default class Luhn {
  constructor() {
    this.computed = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  }

  _sum(number) {
    let sum = 0;
    let digit = 0;
    let i = number.length;
    let even = true;

    while (i--) {
      digit = Number(number[i]);
      sum += (even = !even) ? this.computed[digit] : digit;
    }

    return sum;
  }

  validate(number) {
    if (/[^0-9-\s]+/.test(number))
      return false;

    number = number.replace(/\D/g, '');

    let sum = this._sum(number);
    return sum > 0 && sum % 10 === 0;
  }
};
