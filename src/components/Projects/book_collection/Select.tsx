import _ from 'lodash';
import React from 'react';
import { checkDuplicates } from './handlers';
interface SelectProps {
  item: string;
  id: number;
  data: [];
  inputValues1: string[];
  inputValues2?: string[];
  inputCounter: number[];
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setInputCounter: React.Dispatch<React.SetStateAction<number[]>>;
  setInputValues1: React.Dispatch<React.SetStateAction<string[]>>;
  setInputValues2?: React.Dispatch<React.SetStateAction<string[]>>;
}

const Select: React.FC<SelectProps> = ({
  item,
  id,
  data,
  inputValues1,
  inputValues2,
  inputCounter,
  handleSelectChange,
  setInputCounter,
  setInputValues1,
  setInputValues2,
}) => {
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // console.log(inputValues1, inputValues2);

    if (inputValues1) {
      if (inputValues2) {
        if (
          !checkDuplicates(inputValues1) &&
          !checkDuplicates(inputValues2) &&
          inputValues1[id] &&
          inputValues2[id]
        ) {
          // console.log(
          //   inputValues1,
          //   inputValues2,
          //   inputValues1[id],
          //   inputValues2[id]
          // );
          setInputCounter([...inputCounter, inputCounter.length]);
        }
      }
    }
  };

  const addButton = () => {
    if (id !== inputCounter.length - 1) {
      return null;
    }

    return <button onClick={e => handleAddClick(e)}>add {item}</button>;
  };

  const handleSelectRemove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const arr = _.without(inputCounter, id);
    for (let i = 0; i < arr.length; i++) {
      _.fill(arr, i, i, i + 1);
    }
    const editedInputValues1 = _.without(inputValues1, inputValues1[id]);

    setInputCounter(arr);
    setInputValues1(editedInputValues1);
    if (inputValues2 && setInputValues2) {
      const editedInputValues2 = _.without(inputValues2, inputValues2[id]);
      setInputValues2(editedInputValues2);
    }
  };

  const removeButton = () => {
    if (inputCounter.length > 1) {
      return <button onClick={e => handleSelectRemove(e)}>X</button>;
    }
  };

  return (
    <>
      <label htmlFor={item}>{item}</label>
      <select
        className='form_select'
        id={`${id}`}
        name={item}
        onChange={e => handleSelectChange(e)}
      >
        <option value=''>-- find me --</option>
        {data &&
          data.map((record: any) => {
            let label = record.firstName
              ? `${record.lastName} ${record.firstName}`
              : record.name || record.title;
            return <option key={record.id} value={record.id} label={label} />;
          })}
      </select>
      {addButton()}
      {removeButton()}
    </>
  );
};

export default Select;
