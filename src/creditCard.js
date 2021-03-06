import CreditCardList from './creditCardList';
import Luhn from './helpers/luhn';

export default class CreditCard {
  constructor() {
    this.creditcardlist = new CreditCardList();
    this.luhn = new Luhn();
  }

  getCreditCardList() {
    return this.creditcardlist.getCreditCardList();
  }

  validate(number) {
    return this.luhn.validate(number);
  }

  getCreditCardNameByNumber(number) {
    if (!this.validate(number))
      return false;

    let CREDIT_CARD_LIST = this.getCreditCardList();

    for (let i = 0; i < CREDIT_CARD_LIST.length; i++) {
      let creditcard = CREDIT_CARD_LIST[i];
      let regex = new RegExp(creditcard.regexpFull);

      if (regex.test(number))
        return creditcard.name;
    }

    return false;
  }

  validateSecuryCode(number, code) {
    let brand = this.getCreditCardNameByNumber(number);
    let numberLength;

    numberLength = (brand === 'Amex') ? 4 : 3;
    let regex = new RegExp(`[0-9]{${numberLength}}`);

    if (code.length === numberLength && regex.test(code))
      return true;

    return false;
  }

  validateExpirationDate(month, year) {
    let m = month;
    let y = year;
    let yearLength = y.length;

    if (yearLength < 2 && yearLength > 4)
      return false;

    m = parseInt(m, 10);
    y = parseInt(y, 10);

    if (m < 1 || m > 12)
      return false;

    if (y < 1000 || y >= 3000)
      return false;

    return true;
  }
}
