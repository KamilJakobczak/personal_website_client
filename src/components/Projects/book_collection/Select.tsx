import _ from 'lodash';
import React from 'react';
import { checkDuplicates, processSelectionData } from './handlers';

interface SelectProps {
  item: string;
  id: number;
  data: [];
  selectedValues: string[];
  inputValues?: string[];
  selectCounter: number[];
  setSelectCounter: React.Dispatch<React.SetStateAction<number[]>>;
  setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
  setInputValues?: React.Dispatch<React.SetStateAction<string[]>>;
  setDuplicationError?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Select: React.FC<SelectProps> = ({
  item,
  id,
  data,
  selectedValues,
  inputValues,
  selectCounter,
  setSelectCounter,
  setInputValues,
  setSelectedValues,
  setDuplicationError,
}) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (selectCounter.length === 1) {
      setSelectedValues([value]);
    } else {
      processSelectionData(
        e,
        selectedValues,
        setSelectedValues,
        selectCounter,
        setDuplicationError
      );
    }
  };

  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (selectedValues) {
      if (inputValues) {
        console.log('hmmm');
        if (
          !checkDuplicates(selectedValues) &&
          !checkDuplicates(inputValues) &&
          selectedValues[id] &&
          inputValues[id]
        ) {
          setSelectCounter([...selectCounter, selectCounter.length]);
        }
      }
      if (!checkDuplicates(selectedValues) && selectedValues[id]) {
        console.log('hhmmm');
        setSelectCounter([...selectCounter, selectCounter.length]);
      }
    }
  };

  const handleSelectRemove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const arr = _.without(selectCounter, id);
    for (let i = 0; i < arr.length; i++) {
      _.fill(arr, i, i, i + 1);
    }
    const editedselectedValues = _.without(selectedValues, selectedValues[id]);

    setSelectCounter(arr);
    setSelectedValues(editedselectedValues);
    if (inputValues && setInputValues) {
      const editedinputValues = _.without(inputValues, inputValues[id]);
      setInputValues(editedinputValues);
    }
  };

  const addButton = () => {
    if (id !== selectCounter.length - 1) {
      return null;
    }

    return <button onClick={e => handleAddClick(e)}>add {item}</button>;
  };

  const removeButton = () => {
    if (selectCounter.length > 1) {
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
        value={selectedValues[id] || ''}
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
