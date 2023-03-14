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
  const className = `filter_${name}`;

  return (
    <div className={`filter_category ${className}`}>
      <legend className={'filter_category_legend'}>{name}</legend>
      {data.map((item: any) => {
        return (
          <div key={item.name} className={'filter_category_item'}>
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
