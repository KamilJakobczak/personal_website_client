interface BookFilterProps {
  filterOptions: {
    name: string;
    values: string[];
  }[];
}

const BookFilter: React.FC<BookFilterProps> = ({ filterOptions }) => {
  return (
    <div>
      {filterOptions.map(item => {
        return (
          <select name={item.name} id='' multiple>
            {item.values.map(value => {
              return <option value={value}>{value}</option>;
            })}
          </select>
        );
      })}
    </div>
  );
};
export default BookFilter;
