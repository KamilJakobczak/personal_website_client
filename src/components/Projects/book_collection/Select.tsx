interface SelectProps {
  data: [];
  onAddClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: string
  ) => void;
  item: string;
}

const Select: React.FC<SelectProps> = ({ onAddClick, data, item }) => {
  return (
    <>
      <label htmlFor={item}>{`${item}:`}</label>
      <select className='form_select' id={item} name={item}>
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
