import Checkbox from './Checkbox';

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
  const className = `book_collection__books__filters_${name}`;

  return (
    <div className={className}>
      <legend className={`${className}_legend`}>
        Pick one or more {name}:
      </legend>
      {data.map((item: any) => {
        return (
          <div key={item.name} className={`${className}_item`}>
            <label className='form-control' htmlFor={item.name}>
              <Checkbox
                name={name}
                id={item.id}
                handleCheckboxChange={handleCheckboxChange}
              />
              {item.name}
            </label>
          </div>
        );
      })}
    </div>
  );
};
export default Filter;
