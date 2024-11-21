import { isbnRegex } from '../regex';
import { invalidValue } from './InvalidValue';

export const checkIsbn = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = e.target;

  if (isbnRegex.test(value)) {
    // Remove non ISBN digits, then split into an array
    let chars = value.replace(/[- ]|^ISBN(?:-1[03])?:?/g, '').split('');

    // Remove the final ISBN digit from `chars`, and assign it to `last`
    let last = chars.pop();

    let sum = 0;
    let check, i;

    if (chars.length === 9) {
      // Compute the ISBN-10 check digit
      chars.reverse();
      for (i = 0; i < chars.length; i++) {
        sum += (i + 2) * parseInt(chars[i], 10);
      }
      check = 11 - (sum % 11);
      if (check === 10) {
        check = 'X';
      } else if (check === 11) {
        check = '0';
      }
    } else {
      // Compute the ISBN-13 check digit
      for (i = 0; i < chars.length; i++) {
        sum += ((i % 2) * 2 + 1) * parseInt(chars[i], 10);
      }
      check = 10 - (sum % 10);
      if (check === 10) {
        check = '0';
      }
    }

    if (check.toString() === last?.toString()) {
      invalidValue(e, true);
    } else {
      alert('Invalid ISBN check digit');
    }
  } else {
    invalidValue(e);
  }
};
