import { invalidValue } from './InvalidValue';

export const processSelectionData = (
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  values: string[],
  setValues: React.Dispatch<React.SetStateAction<string[]>>,
  counter: number[],
  setDuplicationError?: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  const element = event.target;
  const { id, value } = element;
  const idNumber = Number(id);
  const index = values.indexOf(value);
  if (counter.length === 1) {
    setValues([value]);
  } else {
    const arr = [...values];
    arr[idNumber] = value;
    setValues(arr);
  }

  if (index >= 0) {
    element.classList.add('invalid');
    if (setDuplicationError) {
      setDuplicationError(true);
      invalidValue(event);
    }
  } else {
    element.classList.remove('invalid');
    if (setDuplicationError) setDuplicationError(false);
    invalidValue(event, true);
  }
};
