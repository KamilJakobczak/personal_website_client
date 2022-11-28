export const processSelectionData = (
  data: string[],
  setData: React.Dispatch<React.SetStateAction<string[]>>,
  value: string,
  counter: number[],
  id: string,
  element: EventTarget & (HTMLSelectElement | HTMLInputElement),
  setDuplicationError?: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  const idNumber = Number(id);
  const index = data.indexOf(value);
  if (counter.length === 1) {
    setData([value]);
  } else {
    const arr = [...data];
    arr[idNumber] = value;
    setData(arr);
  }

  if (index >= 0) {
    element.classList.add('invalid');
    if (setDuplicationError) {
      setDuplicationError(true);
      console.log('duplication error');
    }
  } else {
    element.classList.remove('invalid');
    if (setDuplicationError) setDuplicationError(false);
  }
};
