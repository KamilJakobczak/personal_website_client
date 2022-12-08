interface FilterProps {
  handleCheckboxChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => void;
  filterOptions: {
    name: string;
    data: any;
  };
}

const Filter: React.FC<FilterProps> = ({
  handleCheckboxChange,
  filterOptions,
}) => {
  const { name, data } = filterOptions;
  const className = `book_filters__${name}`;

  return (
    <div className={className}>
      <legend className={`${className}_legend`}>Pick one or more {name}</legend>
      {data.map((item: any) => {
        return (
          <div key={item.name} className={`${className}_item`}>
            <input
              type='checkbox'
              id={item.id}
              name={item.name}
              onChange={e => handleCheckboxChange(e, name)}
            />
            <label htmlFor={item.name}>{item.name}</label>
          </div>
        );
      })}
    </div>
  );
};
export default Filter;
