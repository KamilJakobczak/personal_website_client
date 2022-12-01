import { processSelectionData, regexValidator } from './handlers';

interface InputProps {
  item: string;
  id: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  regex: RegExp;
  type?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  item,
  id,
  value,
  setValue,
  regex,
  type,
  required,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    regexValidator(regex, value, setValue);
  };
  return (
    <>
      <label htmlFor={item}>{item}</label>
      <input
        type={type || 'text'}
        autoComplete='off'
        name={item}
        id={`${id}`}
        value={value}
        required={required || false}
        onChange={e => handleChange(e)}
      />
    </>
  );
};
export default Input;
