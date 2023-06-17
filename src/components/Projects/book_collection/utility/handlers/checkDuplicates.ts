export const checkDuplicates = (arr: string[]): boolean => {
  let value = false;

  for (let i = 0; i < arr.length; i++) {
    const array = [...arr];
    const element = arr[i];
    array.splice(i, 1);

    if (array.includes(element)) {
      value = true;
    }
  }

  return value;
};
