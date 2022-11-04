export const processSelectionData = (
  data: string[],
  method: React.Dispatch<React.SetStateAction<string[]>>,
  value: string,
  counter: number[],
  id: string,
  element: EventTarget & HTMLSelectElement
) => {
  console.log('in setter');
  const idNumber = Number(id);
  const index = data.indexOf(value);
  if (counter.length === 1) {
    method([value]);
  } else if (index === -1 && index !== idNumber) {
    const arr = data;
    data[idNumber] = value;
    method(arr);
    element.classList.remove('invalid');
  } else {
    element.classList.add('invalid');
  }
};
