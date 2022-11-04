import React from 'react';
interface SelectProps {
  id: number;
  data: [];
  onAddClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: string
  ) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  item: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  onAddClick,
  data,
  item,
  handleSelectChange,
}) => {
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
              : record.name;
            return <option key={record.id} value={record.id} label={label} />;
          })}
      </select>
      <button onClick={e => onAddClick(e, item)}>add {item}</button>
    </>
  );
};

export default Select;
