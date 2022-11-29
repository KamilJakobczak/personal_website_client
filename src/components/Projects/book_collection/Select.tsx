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

  onRemoveClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => void;
}

const Select: React.FC<SelectProps> = ({
  id,
  onAddClick,
  data,
  item,
  handleSelectChange,
  onRemoveClick,
}) => {
  const singularString = item.slice(0, item.lastIndexOf('s'));

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
      <button onClick={e => onAddClick(e, item)}>add {singularString}</button>
      <button
        onClick={e => {
          if (onRemoveClick) {
            onRemoveClick(e, id);
          }
        }}
      >
        X
      </button>
    </>
  );
};

export default Select;
