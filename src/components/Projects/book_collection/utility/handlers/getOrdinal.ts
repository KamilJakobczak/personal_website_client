export const getOrdinal = (number: number) => {
  let ord = 'th';

  if (number % 10 === 1 && number % 100 !== 11) {
    ord = 'st';
  } else if (number % 10 === 2 && number % 100 !== 12) {
    ord = 'nd';
  } else if (number % 10 === 3 && number % 100 !== 13) {
    ord = 'rd';
  }

  return ord;
};
